const changeCase = require("../../../src/shared/changeCase");

module.exports = class SchemaElement {
    constructor(obj) {
        this.type = typeof obj;
        this.description = obj?.description || "";
        switch (this.type) {
            case "object": {
                if (obj === null) {
                    this.description = "unable to find schema for a null element, ask the backend team for more information";
                    this.example = null
                } else {
                    if (Array.isArray(obj)) {
                        this.type = "array";
                        this.items = {};
                    } else {
                        this.properties = {};
                    }
                }
                break;
            }
            case "string": {
                this.example = obj || "";
                break;
            }
            case "boolean": {
                this.example = obj || true;
                break;
            }
            case "number": {
                this.type = Number.isInteger(obj) ? "integer" : "number";
                this.example = obj || 3;
                this.format = obj?.format || -32768 < obj < 32767 ? "int16" : -2147483648 < obj < 2147483647 ? "int32" : "int64";
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

    addProperty(property, propertyName) {
        this.properties && (this.properties[propertyName] = property);
        return this;
    }

    addItem(item) {
        this.items = item;
        return this;
    }
};
