const dbConnector = require("../../shared/database/dbConnector");
const TransformerFaction = require("../models/transformerFaction");
const MAIN_TABLE = "transformer_faction",
    MAIN_TABLE_FIELDS = `uuid, name`,
    MAIN_TABLE_VALUES = `:uuid, :name`,
    MAIN_TABLE_PRIMARY_KEY = `uuid`;

//helper functions

//main controller for tranformerFaction

async function getTransformerFactionFromFactionName({ name }) {
    const sql = `SELECT * FROM ${MAIN_TABLE} WHERE name = :name`;
    const query = new dbConnector.Query(sql).setParams({ name });
    try {
        const queryResponse = await query.execute();
        return new TransformerFaction(queryResponse[0]);
    } catch (e) {
        throw new Error(`Failed to retrieve transformer faction ${name} from database: ${e}`);
    }
}

async function getTransformerFactionFromFactionUuid({ uuid }) {
    const sql = `SELECT * FROM ${MAIN_TABLE} WHERE uuid = :uuid`;
    const query = new dbConnector.Query(sql).setParams({ uuid });
    try {
        const queryResponse = await query.execute();
        return new TransformerFaction(queryResponse[0]);
    } catch (e) {
        throw new Error(`Failed to retrieve transformer faction ${uuid} from database: ${e}`);
    }
}

module.exports = { getTransformerFactionFromFactionName, getTransformerFactionFromFactionUuid };
