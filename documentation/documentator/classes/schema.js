const changeCase = require("../../../src/shared/changeCase");

module.exports = class Schema {
    constructor(type) {
        switch (type) {
            case "regular": {
                break;
            }
            case "anyOf": {
                this.anyOf = [];
                break;
            }
            case "oneOf": {
                this.oneOf = [];
                break;
            }
        }
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
    }

    addSchema(schemaElement) {
        this.oneOf && this.oneOf.push(schemaElement);
        this.anyOf && this.anyOf.push(schemaElement);
        return this;
    }
};
