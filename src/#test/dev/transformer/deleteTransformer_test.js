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
    { createNewDummyBumblebee } = require("./common");

const PARENT_CONTEXT = "",
    SERVICE = "transformer",
    SERVICE_PATH = `../../../src/${PARENT_CONTEXT}${SERVICE}`,
    CLASS_NAME = "Transformer",
    SUBCLASS_NAME = "",
    ACTION = "delete",
    RESPONSE_TYPE = "single",
    LAMBDA_TYPE = "command";

const wrapped = mochaPlugin.getWrapper(
    `${LAMBDA_TYPE}`,
    `${SERVICE_PATH}/application/${ACTION}${CLASS_NAME}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}.js`,
    `${LAMBDA_TYPE}`
);

describe(`${SERVICE} ${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}`, () => {
    const TEST_TRANSFORMER_UUID = "123456";
    const ANOTHER_TEST_TRANSFORMER_UUID = "789123";

    beforeEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
        global.testElement = createNewDummyBumblebee({ uuid: TEST_TRANSFORMER_UUID });
        await insertDummyInDb({ dummy: global.testElement });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
    });

    it(`${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""} ${SERVICE}`, async () => {
        var body = {};
        const pathParameters = "123456";
        return wrapped.run({ pathParameters }).then(async (response) => {
            console.log(response);
            const body = JSON.parse(response.body);
            expect(response.statusCode).to.be.equal(200);
            const dummyFromDb = await getDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
            expect(dummyFromDb).to.be.null;
        });
    });
    it("response body key check", async () => {
        const pathParameters = "123456";
        return wrapped
            .run({
                pathParameters,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(body.message).to.be.equal("ok");
            });
    });
    it(`invalid data type check`, async () => {
        const pathParameters = 123456;

        return wrapped
            .run({
                pathParameters,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(response.statusCode).to.be.equal(400);
                expect(body.message.code).contain("INVALID_DATA_TYPE");
            });
    });
});
