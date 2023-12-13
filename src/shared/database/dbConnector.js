const mysql = require("mysql");
const credentials = require("./dbCredentials");
const Util = require("util");

// Systems Available
class MySqlDBConnector {
    constructor(hostname, username, password, port, database, timezone) {
        this.connection = mysql.createConnection({
            host: hostname,
            user: username,
            password: password, // TODO: Where to store the password protected
            port: port,
            database: database,
            timezone: timezone,
        });

        this.connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(
                // eslint-disable-next-line no-useless-escape
                /\:(\w+)/g,
                function (txt, key) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                    }
                    return txt;
                }.bind(this)
            );
        };
    }
}

class MySqlQuery {
    constructor(query, paramCredentials = null) {
        this.query = query;
        this.params = undefined;
        this.paramCredentials = paramCredentials;
    }

    getQuery() {
        return this.query;
    }
    setQuery(query) {
        this.query = query;
    }

    getParams() {
        return this.params;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

    addParam(paramName, paramValue) {
        if (this.params) {
            this.params[paramName] = paramValue;
        } else {
            this.params = {
                [paramName]: paramValue,
            };
        }
        return this;
    }

    async execute() {
        const db = makeDb(this);
        let response;
        try {
            const promise = await db.query(this.getQuery(), this.getParams());
            response = await promise;
            await db.close();
        } catch (err) {
            console.log("Error in MySQLQuery execution: " + err);
            await db.close();
            throw err;
        }
        return response;
    }
}

function createConnector(connectionObj) {
    if (connectionObj.paramCredentials) {
        return new MySqlDBConnector(
            connectionObj.paramCredentials.RDS_HOSTNAME,
            connectionObj.paramCredentials.RDS_USERNAME,
            connectionObj.paramCredentials.RDS_PASSWORD,
            connectionObj.paramCredentials.RDS_PORT,
            connectionObj.paramCredentials.RDS_SCHEMA,
            connectionObj.paramCredentials.TIMEZONE
        );
    } else {
        return new MySqlDBConnector(
            credentials.RDS_HOSTNAME,
            credentials.RDS_USERNAME,
            credentials.RDS_PASSWORD,
            credentials.RDS_PORT,
            credentials.RDS_SCHEMA,
            credentials.TIMEZONE
        );
    }
}

function makeDb(connectionObj) {
    const connection = createConnector(connectionObj).connection;
    return {
        query(sql, args) {
            return Util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return Util.promisify(connection.end).call(connection);
        },
        beginTransaction() {
            return Util.promisify(connection.beginTransaction).call(connection);
        },
        commit() {
            return Util.promisify(connection.commit).call(connection);
        },
        rollback() {
            return Util.promisify(connection.rollback).call(connection);
        },
    };
}

async function commitMySQLTransaction(queries) {
    const db = makeDb(this);
    try {
        await db.beginTransaction();
        for (let query of queries) {
            await db.query(query.getQuery(), query.getParams());
        }
        await db.commit();
        await db.close();
    } catch (err) {
        console.log("Beginning Rollback. Error in MySQLQuery transaction: " + err);
        await db.rollback();
        await db.close();
        throw err;
    }
}

// Actual SQL implementation
module.exports = {
    Query: MySqlQuery,
    commitTransaction: commitMySQLTransaction,
};
