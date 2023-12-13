const changeCase = require("../../../src/shared/changeCase");

module.exports = class RequestBody {
    constructor(obj) {
        this.content = {
            "application/json": {
                schema: obj?.content["application/json"]?.schema || {},
                examples: obj?.content["application/json"]?.examples || {},
            },
        };
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
    }

    setSchema(schema) {
        this.content["application/json"].schema = schema;
        return this;
    }

    addRequestBodyExample(requestBodyExample, requestBodyExampleName) {
        this.content["application/json"].examples[requestBodyExampleName] = { value: requestBodyExample };
        return this;
    }
};
