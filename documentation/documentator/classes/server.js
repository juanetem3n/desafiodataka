const changeCase = require("../../../src/shared/changeCase");

module.exports = class Server {
    constructor(obj) {
        this.url = obj?.url || null;
        this.description = obj?.description || null;
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }
};
