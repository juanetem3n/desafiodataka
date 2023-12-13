const fs = require("fs");

const getPackageJsonFileInJSON = () => {
    return JSON.parse(fs.readFileSync(__dirname + "/../../../package.json", "utf8"));
};

const normalizeBodyContent = ({ bodyContent }) => {
    bodyContent = bodyContent.replaceAll("//", "");
    bodyContent = eval("(" + bodyContent + ")");
    return bodyContent;
};

function isUpperCase(char) {
    if (char == char.toUpperCase()) {
        return true;
    } else return false;
}

function convertToSentenceCase({ string }) {
    const array = Array.from(string);
    for (let i = 0; i < array.length; i++) {
        if (isUpperCase(array[i])) {
            array.splice(i, 0, " ");
            i++;
        }
    }
    return array.toString().toLowerCase().replaceAll(",", "");
}

const getParameters = ({ path }) => {
    const parameterStringArray = [],
        parameters = [];
    const parameterStrings = path.split("{");
    for (let i = 1, len = parameterStrings.length; i < len; i++) {
        const parameterString = parameterStrings[i];
        parameterStringArray.push(parameterString.slice(0, parameterString.indexOf("}")));
    }
    parameterStringArray.forEach((parameterString) => {
        parameters.push({
            required: true,
            schema: { type: typeof parameterString, minimum: 1 },
            description: `The ${convertToSentenceCase({ string: parameterString })}`,
            name: parameterString,
            in: "path",
        });
    });
    return parameters.length > 0 ? parameters : false;
};

const getServerlessFileInJSON = ({ path }) => {
    const yaml = require("js-yaml");

    const yamlTypes = [
        new yaml.Type("!GetAtt", { kind: "sequence" }),
        new yaml.Type("!Join", { kind: "sequence" }),
        new yaml.Type("!Ref", { kind: "scalar" }),
    ];
    const customSchema = yaml.DEFAULT_SCHEMA.extend(yamlTypes);
    const serverlessFileInUTF8 = fs.readFileSync(path, "utf8");
    return yaml.load(serverlessFileInUTF8, { schema: customSchema });
};

const getTestPath = ({ functions, functionName, boundedContext, parentContext, name }) => {
    let { handler } = functions[functionName];
    handler.includes("${self:custom.boundedContext}") && (handler = handler.replace("${self:custom.boundedContext}", boundedContext));
    handler.includes("${self:custom.parentContext}") && (handler = handler.replace("${self:custom.parentContext}", parentContext));
    handler.includes("${self:custom.name}") && (handler = handler.replace("${self:custom.name}", name));
    const splittedPath = handler.split(".")[0].split("/");
    let testPath = `${splittedPath[0]}/#test/dev`;
    splittedPath.slice(1).forEach((element) => {
        element !== "application" && (testPath += `/${element}`);
    });
    return `${testPath}_test.js`;
};

const getHandlerPath = ({ functions, functionName, boundedContext, parentContext, name }) => {
    let { handler } = functions[functionName];
    handler.includes("${self:custom.boundedContext}") && (handler = handler.replace("${self:custom.boundedContext}", boundedContext));
    handler.includes("${self:custom.parentContext}") && (handler = handler.replace("${self:custom.parentContext}", parentContext));
    handler.includes("${self:custom.name}") && (handler = handler.replace("${self:custom.name}", name));
    const splittedPath = handler.split(".")[0].split("/");
    let testPath = `${splittedPath[0]}/`;
    splittedPath.slice(1).forEach((element) => {
        testPath += `/${element}`;
    });
    return `${testPath}.js`;
};

function createSchemaElementFromPayload({ payload }) {
    const SchemaElement = require("../classes/schemaElement");

    const schemaElement = new SchemaElement(payload);
    if (typeof payload === "string" || typeof payload === "number" || typeof payload === "boolean" || payload === null) {
        return schemaElement;
    } else if (typeof payload === "object") {
        if (Array.isArray(payload)) {
            if (payload.length === 0) {
                schemaElement.addItem(createSchemaElementFromPayload({ payload: null }));
            } else {
                schemaElement.addItem(createSchemaElementFromPayload({ payload: payload[0] }));
            }
        } else {
            Object.keys(payload).forEach((propertyName) => {
                schemaElement.addProperty(createSchemaElementFromPayload({ payload: payload[propertyName] }), propertyName);
            });
        }
    }
    return schemaElement;
}

async function getPayloads({ testPath }) {
    const axios = require("axios"),
        path = require("path");

    try {
        let payloads = [];
        const testFile = fs.readFileSync(path.join(__dirname, `../../../${testPath}`), "utf8").replace(/\n/g, "");
        var bodies = testFile.split("var body = ").slice(1);
        if (bodies.length < 1) throw new Error();
        for (const body of bodies) {
            try {
                let bodyContent = body.split(";")[0],
                    payload;
                if (bodyContent.includes(`(await axios.get`)) {
                    const url = bodyContent
                        .slice(bodyContent.indexOf("(", bodyContent.indexOf("(") + 1) + 1, bodyContent.indexOf(")"))
                        .slice(1, -1);
                    payload = (await axios.get(url)).data;
                } else {
                    payload = normalizeBodyContent({ bodyContent });
                }
                payloads.push(payload);
            } catch (e) {
                payloads.push(`mock unavailable`);
            }
        }
        if (payloads.length === 0) {
            throw new Error();
        }
        return payloads;
    } catch (err) {
        return ["error: `Old endpoint, please contact backend team for more information`"];
    }
}

async function getDescription({ handlerPath }) {
    const path = require("path");
    try {
        const handlerFile = fs.readFileSync(path.join(__dirname, `../../../${handlerPath}`), "utf8").replace(/\n/g, "");
        var description = handlerFile.split("/**").slice(1);
        if (description.length < 1) throw new Error();
        return description[0].split("**/")[0].replaceAll("*", "").replaceAll("@desc", "").trim();
    } catch (err) {
        return "No description available for this endpoint, please contact backend team for more information";
    }
}

module.exports = {
    createSchemaElementFromPayload,
    getParameters,
    getDescription,
    getPayloads,
    normalizeBodyContent,
    getServerlessFileInJSON,
    getPackageJsonFileInJSON,
    getTestPath,
    getHandlerPath,
};
