const dbConnector = require("../../../../src/shared/database/dbConnector");

const MAIN_TABLE = "transformer",
    MAIN_TABLE_PRIMARY_KEY = "uuid";

const insertDummyInDb = async ({ dummy }) => {
    const fieldsValues = {
        uuid: ":uuid",
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

    const fields = Object.keys(fieldsValues).toString(),
        values = Object.values(fieldsValues).toString();

    const params = {
        uuid: dummy.uuid,
        name: dummy.name,
        description: dummy.description,
        factionUuid: dummy.faction.uuid,
        abilities: JSON.stringify(dummy.abilities),
        objectShape: dummy.objectShape,
        image: dummy.image,
        frameNumber: dummy.frameNumber,
        createdAt: dummy.createdAt,
        updatedAt: dummy.updatedAt,
    };
    const queryResponse = await new dbConnector.Query(`INSERT INTO ${MAIN_TABLE} (${fields}) VALUES (${values})`)
        .setParams(params)
        .execute();
    return queryResponse;
};

const deleteDummyFromDb = async ({ dummy }) => {
    const params = {
        primaryKey: dummy[MAIN_TABLE_PRIMARY_KEY],
    };
    const sql = `DELETE FROM ${MAIN_TABLE} WHERE ${MAIN_TABLE}.${MAIN_TABLE_PRIMARY_KEY} = :primaryKey`;
    const query = new dbConnector.Query(sql).setParams(params);
    const queryResponse = await query.execute();
    return queryResponse;
};

const getDummyFromDb = async ({ dummy }) => {
    const params = {
        primaryKey: dummy[MAIN_TABLE_PRIMARY_KEY],
    };
    const sql = `SELECT * FROM ${MAIN_TABLE} WHERE ${MAIN_TABLE}.${MAIN_TABLE_PRIMARY_KEY} = :primaryKey`;
    const query = new dbConnector.Query(sql).setParams(params);
    let queryResponse = await query.execute();
    return queryResponse[0] ? queryResponse[0] : null;
};

module.exports = { insertDummyInDb, deleteDummyFromDb, getDummyFromDb };
