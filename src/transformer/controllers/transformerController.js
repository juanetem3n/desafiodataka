const dbConnector = require("../../shared/database/dbConnector");
const Transformer = require("../models/transformer");
const { getTransformerFactionFromFactionUuid } = require("../controllers/transformerFactionController");
const MAIN_TABLE = "transformer",
    MAIN_TABLE_FIELDS = `uuid, name, description, faction_uuid, abilities, object_shape, image, frame_number, created_at, updated_at`,
    MAIN_TABLE_VALUES = `:uuid, :name, :description, :factionUuid, :abilities, :objectShape, :image, :frameNumber, :createdAt, :updatedAt`,
    MAIN_TABLE_PRIMARY_KEY = `uuid`;

//helper functions

//main controller for transformer

async function insertTransformer({ transformer }) {
    const params = {
        uuid: transformer.getUuid(),
        name: transformer.getName(),
        description: transformer.getDescription(),
        factionUuid: transformer.getFaction().uuid,
        abilities: JSON.stringify(transformer.getAbilities()),
        objectShape: transformer.getObjectShape(),
        image: transformer.getImage(),
        frameNumber: transformer.getFrameNumber(),
        createdAt: transformer.createdAt,
        updatedAt: transformer.updatedAt,
    };

    try {
        const queryResponse = await new dbConnector.Query(`INSERT INTO ${MAIN_TABLE} (${MAIN_TABLE_FIELDS}) VALUES (${MAIN_TABLE_VALUES})`)
            .setParams(params)
            .execute();
        return queryResponse;
    } catch (e) {
        throw new Error(`Failed to insert transformer ${transformer.uuid}: ${e}`);
    }
} // inserts transformer in db

async function updateTransformer({ transformer }) {
    const fieldsValues = {
        name: ":name",
        description: ":description",
        faction_uuid: ":factionUuid",
        abilities: ":abilities",
        object_shape: ":objectShape",
        image: ":image",
        frame_number: ":frameNumber",
        created_at: ":createdAt",
        updated_at: ":updatedAt",
    };

    const initialSQL = `UPDATE ${MAIN_TABLE} SET `;
    let paramSQL = ``;
    let whereSQL = `WHERE ${MAIN_TABLE_PRIMARY_KEY} = :primaryKey`;

    Object.keys(fieldsValues).forEach((property, i, array) => {
        let isLastElement = i === array.length - 1;
        paramSQL += ` ${property} = ${fieldsValues[property]}${!isLastElement ? "," : ""}`;
    });

    const updateSQL = `${initialSQL} ${paramSQL} ${whereSQL}`;

    const params = {
        primaryKey: transformer[MAIN_TABLE_PRIMARY_KEY],
        name: transformer.getName(),
        description: transformer.getDescription(),
        factionUuid: transformer.getFaction().uuid,
        abilities: JSON.stringify(transformer.getAbilities()),
        objectShape: transformer.getObjectShape(),
        image: transformer.getImage(),
        frameNumber: transformer.getFrameNumber(),
        createdAt: transformer.getCreatedAt(),
        updatedAt: transformer.getUpdatedAt(),
    };

    try {
        const queryResponse = await new dbConnector.Query(updateSQL).setParams(params).execute();
        return queryResponse;
    } catch (e) {
        throw new Error(`Failed to update transformer: ${transformer.uuid}: ${e}`);
    }
} // updates transformer in db

async function getTransformerFromPrimaryKey({ transformer }) {
    const params = {
        primaryKey: transformer[MAIN_TABLE_PRIMARY_KEY],
    };
    const sql = `SELECT * FROM ${MAIN_TABLE} WHERE ${MAIN_TABLE_PRIMARY_KEY} = '${params.primaryKey}'`;
    const query = new dbConnector.Query(sql).setParams(params);
    try {
        const queryResponse = await query.execute();
        if (queryResponse.length === 0) {
            return null;
        }
        return new Transformer({
            uuid: queryResponse[0].uuid,
            name: queryResponse[0].name,
            description: queryResponse[0].description,
            abilities: JSON.parse(queryResponse[0].abilities),
            image: queryResponse[0].image,
            frameNumber: queryResponse[0].frame_number,
            objectShape: queryResponse[0].object_shape,
            createdAt: queryResponse[0].created_at,
            updatedAt: queryResponse[0].updated_at,
            faction: await getTransformerFactionFromFactionUuid({ uuid: queryResponse[0].faction_uuid }),
        });
    } catch (e) {
        throw new Error(`Failed to retrieve transformer ${transformer.uuid} from database: ${e}`);
    }
} // reads transformer from db

async function deleteTransformer({ transformer }) {
    const params = {
        primaryKey: transformer[MAIN_TABLE_PRIMARY_KEY],
    };
    const sql = `DELETE FROM ${MAIN_TABLE} WHERE ${MAIN_TABLE_PRIMARY_KEY} = :primaryKey`;
    const query = new dbConnector.Query(sql, global.environment?.secret).setParams(params);
    try {
        const queryResponse = await query.execute();
        return queryResponse;
    } catch (e) {
        throw new Error(`Failed to delete transformer ${transformer.uuid} from database: ${e}`);
    }
} // deletes transformer from db

async function getTransformerList() {
    let transformerList = [];
    const sql = `SELECT * FROM ${MAIN_TABLE}`;
    const query = new dbConnector.Query(sql);
    try {
        const queryResponse = await query.execute();
        for (const response of queryResponse) {
            transformerList.push(
                new Transformer({
                    uuid: response.uuid,
                    name: response.name,
                    description: response.description,
                    abilities: JSON.parse(response.abilities),
                    image: response.image,
                    frameNumber: response.frame_number,
                    objectShape: response.object_shape,
                    createdAt: response.created_at,
                    updatedAt: response.updated_at,
                    faction: await getTransformerFactionFromFactionUuid({ uuid: response.faction_uuid }),
                })
            );
        }
        return transformerList;
    } catch (e) {
        throw new Error(`Failed to retrieve transformer list from database: ${e}`);
    }
} // reads a list of transformer

//<========================================================================================== add code here

module.exports = {
    insertTransformer,
    updateTransformer,
    getTransformerFromPrimaryKey,
    deleteTransformer,
    getTransformerList,
};
