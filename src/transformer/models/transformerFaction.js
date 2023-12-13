const uuid = require("uuid");

module.exports = class TransformerFaction {
    constructor(obj) {
        this.uuid = obj?.uuid || null;
        this.name = obj?.name || null;
    }

    generateUuid() {
        this.uuid = uuid.v4();
        return this;
    }

    setUuid(uuid) {
        this.uuid = uuid;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getUuid() {
        return this.uuid;
    }

    getName() {
        return this.name;
    }

    get() {
        return {
            uuid: this.uuid,
            name: this.name,
        };
    }
};
