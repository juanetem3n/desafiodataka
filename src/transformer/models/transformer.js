const uuid = require("uuid");
const DatakaDate = require("../../shared/datakaDate/datakaDate");
const changeCase = require("../../../src/shared/changeCase");
const TransformerFaction = require("../models/transformerFaction");

module.exports = class Transformer {
    constructor(obj) {
        this.uuid = obj?.uuid || null;
        this.name = obj?.name || null;
        this.description = obj?.description || null;
        this.faction = new TransformerFaction(obj?.faction || null);
        this.abilities = obj?.abilities || [];
        this.objectShape = obj?.objectShape || obj?.object_shape || null;
        this.image = obj?.image || null;
        this.frameNumber = obj?.frameNumber || null;
        this.createdAt = obj?.createdAt || obj?.created_at || null;
        this.updatedAt = obj?.updatedAt || obj?.updated_at || null;
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
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

    setDescription(description) {
        this.description = description;
        return this;
    }

    setFaction(faction) {
        this.faction = faction;
        return this;
    }

    setAbilities(abilities) {
        if (Array.isArray(abilities)) {
            this.abilities = abilities;
            return this;
        }
        throw new Error("Abilities should be an array");
    }

    addAbility(ability) {
        this.abilities.push(ability);
        return this;
    }

    setObjectShape(objectShape) {
        this.objectShape = objectShape;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setFrameNumber(frameNumber) {
        this.frameNumber = frameNumber;
        return this;    
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    generateCreatedAt() {
        this.createdAt = new DatakaDate({ TIMEZONE: "system" }).now().getDateString();
        return this;
    }

    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    generateUpdatedAt() {
        this.updatedAt = new DatakaDate({ TIMEZONE: "system" }).now().getDateString();
        return this;
    }

    getUuid() {
        return this.uuid;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getFaction() {
        return this.faction;
    }

    getAbilities() {
        return this.abilities;
    }

    getObjectShape() {
        return this.objectShape;
    }

    getImage() {
        return this.image;
    }

    getFrameNumber() {
        return this.frameNumber;
    }
    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

    get() {
        return {
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            faction: this.faction,
            abilities: this.abilities,
            object_shape: this.objectShape,
            image: this.image,
            frame_number: this.frameNumber,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }
};
