/* eslint-env mocha */
"use strict";
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    dirtyChai = require("dirty-chai"),
    expect = require("chai").expect;
chai.use(chaiHttp);
const mochaPlugin = require("serverless-mocha-plugin");
mochaPlugin.chai.use(dirtyChai);

const { insertDummyInDb, deleteDummyFromDb, getDummyFromDb } = require("../#dbQueries/transformer_queries"),
    { createNewDummyOptimus } = require("./common");

const PARENT_CONTEXT = "",
    SERVICE = "transformer",
    SERVICE_PATH = `../../../src/${PARENT_CONTEXT}${SERVICE}`,
    CLASS_NAME = "Transformer",
    SUBCLASS_NAME = "",
    ACTION = "update",
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
        await insertDummyInDb({ dummy: global.testElement });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
    });

    it(`${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""} ${SERVICE}`, async () => {
        // WARNING: This test have to end properly.
        // Remember to use var to declare body as the documentator is able to recognize it,
        // and don't use any variables inside the body declaration (the documentator have to read the data type for it)
        const pathParameters = "123456";
        var body = {
            name: "Updated Prime",
            frame_number: "3wn3wn3wn3wn3wn3w",
        };
        return wrapped.run({ pathParameters, body }).then(async (response) => {
            console.log(response);
            const body = JSON.parse(response.body);
            expect(response.statusCode).to.be.equal(200);
            const dummyFromDb = await getDummyFromDb({ dummy: { uuid: body.message } });
            expect(dummyFromDb.name).to.be.equal("Updated Prime");
            expect(dummyFromDb.frame_number).to.be.equal("3wn3wn3wn3wn3wn3w");
            expect(dummyFromDb.updated_at > global.testElement.updatedAt).to.be.equal(true);
        });
    });
    it("response body key check", async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const pathParameters = "123456";
        const body = {
            name: "Updated Prime",
            frame_number: "3wn3wn3wn3wn3wn3w",
        };
        return wrapped.run({ pathParameters, body }).then(async (response) => {
            const body = JSON.parse(response.body);
            expect(body).to.have.all.keys("message");
            expect(body.message).to.be.a("string");
        });
    });
    it(`invalid data type check`, async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const pathParameters = "123456";
        const body = {
            name: 123456,
            frame_number: { number: "3wn3wn3wn3wn3wn3w" },
        };
        return wrapped.run({ pathParameters, body }).then(async (response) => {
            const body = JSON.parse(response.body);
            expect(response.statusCode).to.be.equal(400);
            expect(body.message.code).contain("INVALID_DATA_TYPE");
        });
    });
});
