/* eslint-env mocha */
"use strict";
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    dirtyChai = require("dirty-chai"),
    expect = require("chai").expect;
chai.use(chaiHttp);
const mochaPlugin = require("serverless-mocha-plugin");
mochaPlugin.chai.use(dirtyChai);

const { deleteDummyFromDb, getDummyFromDb } = require("../#dbQueries/transformer_queries"),
    { createNewDummyOptimus } = require("./common");

const PARENT_CONTEXT = "",
    SERVICE = "transformer",
    SERVICE_PATH = `../../../src/${PARENT_CONTEXT}${SERVICE}`,
    CLASS_NAME = "Transformer",
    SUBCLASS_NAME = "",
    ACTION = "create",
    RESPONSE_TYPE = "single",
    LAMBDA_TYPE = "command";

const wrapped = mochaPlugin.getWrapper(
    `${LAMBDA_TYPE}`,
    `${SERVICE_PATH}/application/${ACTION}${CLASS_NAME}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}.js`,
    `${LAMBDA_TYPE}`
);

describe(`${SERVICE} ${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}`, () => {
    const TEST_TRANSFORMER_UUID = "123456";

    beforeEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
        global.testElement = createNewDummyOptimus({ uuid: TEST_TRANSFORMER_UUID });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
    });

    it(`${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""} ${SERVICE}`, async () => {
        // WARNING: This test have to end properly.
        // Remember to use var to declare body as the documentator is able to recognize it,
        // and don't use any variables inside the body declaration (the documentator have to read the data type for it)
        var body = {
            name: "Optimus Prime",
            description:
                "Optimus Prime (formerly known as Orion Pax) has strong moral character, excellent leadership, and sound decision-making skills. Optimus Prime has a strong sense of honor and justice, being dedicated to building peaceful and mutually beneficial co-existence with humans, the protection of life and liberty of all sentient species.",
            faction_name: "Autobot",
            abilities: ["Brilliant military tactics", "Powerful martial arts", "Advanced extraterrestrial weaponry"],
            object_shape: "Peterbilt 379",
            image: "https://static.printler.com/cache/c/c/6/2/e/7/cc62e7c9ed2bf39cf102dd6ad870ed2e03220060.jpg",
            frame_number: "WVGZZZ5NZJM131395",
        };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(response.statusCode).to.be.equal(200);
                const dummyFromDb = await getDummyFromDb({ dummy: { uuid: body.message } });
                expect(dummyFromDb.name).to.be.equal(global.testElement.name);
                expect(dummyFromDb.description).to.be.equal(global.testElement.description);
                expect(dummyFromDb.faction_uuid).to.be.equal(global.testElement.faction.uuid);
                expect(dummyFromDb.image).to.be.equal(global.testElement.image);
                expect(dummyFromDb.object_shape).to.be.equal(global.testElement.objectShape);
                expect(
                    JSON.stringify(
                        JSON.parse(dummyFromDb.abilities).sort((a, b) => {
                            return a - b;
                        })
                    )
                ).to.be.equal(
                    JSON.stringify(
                        global.testElement.abilities.sort((a, b) => {
                            return a - b;
                        })
                    )
                );
                expect(dummyFromDb.frame_number).to.be.equal("WVGZZZ5NZJM131395");
                await deleteDummyFromDb({ dummy: { uuid: dummyFromDb.uuid } });
            });
    });
    it("response body key check", async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const body = {
            name: "Optimus Prime",
            description:
                "Optimus Prime (formerly known as Orion Pax) has strong moral character, excellent leadership, and sound decision-making skills. Optimus Prime has a strong sense of honor and justice, being dedicated to building peaceful and mutually beneficial co-existence with humans, the protection of life and liberty of all sentient species.",
            faction_name: "Autobot",
            abilities: ["Brilliant military tactics", "Powerful martial arts", "Advanced extraterrestrial weaponry"],
            object_shape: "Peterbilt 379",
            image: "https://static.printler.com/cache/c/c/6/2/e/7/cc62e7c9ed2bf39cf102dd6ad870ed2e03220060.jpg",
            frame_number: "WVGZZZ5NZJM131395",
        };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(body).to.have.all.keys("message");
                expect(body.message).to.be.a("string");
                await deleteDummyFromDb({ dummy: { uuid: body.message } });
            });
    });
    it(`invalid data type check`, async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const body = {
            name: 123456789,
            description:
                "Optimus Prime (formerly known as Orion Pax) has strong moral character, excellent leadership, and sound decision-making skills. Optimus Prime has a strong sense of honor and justice, being dedicated to building peaceful and mutually beneficial co-existence with humans, the protection of life and liberty of all sentient species.",
            faction_name: "Autobot",
            abilities: ["Brilliant military tactics", "Powerful martial arts", "Advanced extraterrestrial weaponry"],
            object_shape: "Peterbilt 379",
            image: "https://static.printler.com/cache/c/c/6/2/e/7/cc62e7c9ed2bf39cf102dd6ad870ed2e03220060.jpg",
            frame_number: "WVGZZZ5NZJM131395",
        };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(response.statusCode).to.be.equal(400);
                expect(body.message.code).contain("INVALID_DATA_TYPE");
            });
    });
    it(`invalid parameter check`, async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const body = { nAmes: "12345" };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(response.statusCode).to.be.equal(400);
                expect(body.message.code).contain("INVALID_PARAMETERS");
            });
    });
});
