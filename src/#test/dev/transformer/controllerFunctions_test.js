"use strict";
let chai = require("chai");
const mochaPlugin = require("serverless-mocha-plugin");
const dirtyChai = require("dirty-chai");
mochaPlugin.chai.use(dirtyChai);
const expect = require("chai").expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const {
    insertTransformer,
    getTransformerFromPrimaryKey,
    updateTransformer,
    deleteTransformer,
} = require("../../../transformer/controllers/transformerController");
const { createNewDummyOptimus } = require("./common");
const { insertDummyInDb, deleteDummyFromDb, getDummyFromDb } = require("../#dbQueries/transformer_queries");

// Each test should be independent of others

describe("Check transformerController functions", () => {
    let transformer;
    const TEST_DUMMY_UUID = "123456";

    beforeEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_DUMMY_UUID } });
        transformer = createNewDummyOptimus({ uuid: TEST_DUMMY_UUID });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_DUMMY_UUID } });
    });

    it("insertTransformer function - should save transformer in db - works ok", async () => {
        await insertTransformer({ transformer });
        const dummyFromDb = await getDummyFromDb({ dummy: { uuid: TEST_DUMMY_UUID } });
        expect(dummyFromDb.uuid).to.be.equal(TEST_DUMMY_UUID);
        expect(dummyFromDb.name).to.be.equal(transformer.name);
        expect(dummyFromDb.description).to.be.equal(transformer.description);
        expect(dummyFromDb.faction_uuid).to.be.equal(transformer.faction.uuid);
        expect(dummyFromDb.image).to.be.equal(transformer.image);
        expect(dummyFromDb.object_shape).to.be.equal(transformer.objectShape);
        expect(
            JSON.stringify(
                JSON.parse(dummyFromDb.abilities).sort((a, b) => {
                    return a - b;
                })
            )
        ).to.be.equal(
            JSON.stringify(
                transformer.abilities.sort((a, b) => {
                    return a - b;
                })
            )
        );
        expect(dummyFromDb.created_at).to.be.equal(transformer.createdAt);
        expect(dummyFromDb.updated_at).to.be.equal(transformer.updatedAt);
        expect(dummyFromDb.frame_number).to.be.equal("WVGZZZ5NZJM131395");
    });
    it("getTransformerFromPrimaryKey function - if exists should return the transformer object", async () => {
        await insertDummyInDb({ dummy: transformer });
        const dummyFromDb = await getTransformerFromPrimaryKey({ transformer: { uuid: TEST_DUMMY_UUID } });
        expect(dummyFromDb.uuid).to.be.equal(TEST_DUMMY_UUID);
        expect(dummyFromDb.name).to.be.equal(transformer.name);
        expect(dummyFromDb.description).to.be.equal(transformer.description);
        expect(dummyFromDb.faction.uuid).to.be.equal(transformer.faction.uuid);
        expect(dummyFromDb.image).to.be.equal(transformer.image);
        expect(dummyFromDb.objectShape).to.be.equal(transformer.objectShape);
        expect(
            JSON.stringify(
                dummyFromDb.abilities.sort((a, b) => {
                    return a - b;
                })
            )
        ).to.be.equal(
            JSON.stringify(
                transformer.abilities.sort((a, b) => {
                    return a - b;
                })
            )
        );
        expect(dummyFromDb.createdAt).to.be.equal(transformer.createdAt);
        expect(dummyFromDb.updatedAt).to.be.equal(transformer.updatedAt);
        expect(dummyFromDb.frameNumber).to.be.equal(transformer.frameNumber);
        expect(dummyFromDb).to.have.all.keys(
            "uuid",
            "name",
            "abilities",
            "faction",
            "image",
            "objectShape",
            "description",
            "createdAt",
            "updatedAt",
            "frameNumber"
        );
    });
    it("getTransformerFromPrimaryKey function - if doesn't exist should return null", async () => {
        const dummyFromDb = await getTransformerFromPrimaryKey({ transformer: { uuid: "unknow" } });
        expect(dummyFromDb).to.be.equal(null);
    });
    it("updateTransformer function - should update dummy in db - works ok", async () => {
        await insertDummyInDb({ dummy: transformer });
        transformer.name = "updated";
        await updateTransformer({ transformer });
        const dummyFromDb = await getDummyFromDb({ dummy: { uuid: TEST_DUMMY_UUID } });
        expect(dummyFromDb.uuid).to.be.equal(TEST_DUMMY_UUID);
        expect(dummyFromDb.name).to.be.equal("updated");
        expect(dummyFromDb.description).to.be.equal(transformer.description);
        expect(dummyFromDb.faction_uuid).to.be.equal(transformer.faction.uuid);
        expect(dummyFromDb.image).to.be.equal(transformer.image);
        expect(dummyFromDb.object_shape).to.be.equal(transformer.objectShape);
        expect(
            JSON.stringify(
                JSON.parse(dummyFromDb.abilities).sort((a, b) => {
                    return a - b;
                })
            )
        ).to.be.equal(
            JSON.stringify(
                transformer.abilities.sort((a, b) => {
                    return a - b;
                })
            )
        );
        expect(dummyFromDb.created_at).to.be.equal(transformer.createdAt);
        expect(dummyFromDb.updated_at).to.be.equal(transformer.updatedAt);
    });
    it("deleteTransformer function - should delete dummy in db - works ok", async () => {
        await insertDummyInDb({ dummy: transformer });
        await deleteTransformer({ transformer });
        const dummyFromDb = await getDummyFromDb({ dummy: { uuid: TEST_DUMMY_UUID } });
        expect(dummyFromDb).to.be.equal(null);
    });
});
