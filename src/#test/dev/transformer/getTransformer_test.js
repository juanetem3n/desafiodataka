/* eslint-env mocha */
"use strict";
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    dirtyChai = require("dirty-chai"),
    expect = require("chai").expect;
chai.use(chaiHttp);
const mochaPlugin = require("serverless-mocha-plugin");
mochaPlugin.chai.use(dirtyChai);

const changeCase = require("../../../../src/shared/changeCase");

const { insertDummyInDb, deleteDummyFromDb, getDummyFromDb } = require("../#dbQueries/transformer_queries"),
    { createNewDummyBumblebee, createNewDummyMegatron } = require("./common");

const PARENT_CONTEXT = "",
    SERVICE = "transformer",
    SERVICE_PATH = `../../../src/${PARENT_CONTEXT}${SERVICE}`,
    CLASS_NAME = "Transformer",
    SUBCLASS_NAME = "",
    ACTION = "get",
    RESPONSE_TYPE = "single",
    LAMBDA_TYPE = "query";

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
        await deleteDummyFromDb({ dummy: { uuid: ANOTHER_TEST_TRANSFORMER_UUID } });
        global.testElement2 = createNewDummyMegatron({ uuid: ANOTHER_TEST_TRANSFORMER_UUID });
        await insertDummyInDb({ dummy: global.testElement2 });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
        await deleteDummyFromDb({ dummy: { uuid: ANOTHER_TEST_TRANSFORMER_UUID } });
    });

    it(`${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""} ${SERVICE}`, async () => {
        var body = null;
        const pathParameters = body;
        return wrapped.run({ pathParameters }).then(async (response) => {
            console.log(response);
            const body = JSON.parse(response.body);
            expect(response.statusCode).to.be.equal(200);
            expect(
                JSON.stringify(changeCase({ object: body, changeTo: "camelCase" })).includes(JSON.stringify(global.testElement))
            ).to.be.equal(true);
            expect(
                JSON.stringify(changeCase({ object: body, changeTo: "camelCase" })).includes(JSON.stringify(global.testElement2))
            ).to.be.equal(true);
        });
    });
    it("response body key check", async () => {
        var body = null;
        const pathParameters = body;
        return wrapped
            .run({
                pathParameters,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                body.forEach((body) => {
                    expect(body).to.have.all.keys(
                        "uuid",
                        "name",
                        "abilities",
                        "faction",
                        "image",
                        "object_shape",
                        "description",
                        "created_at",
                        "updated_at",
                        "frame_number"
                    );
                    expect(body.uuid).to.be.a("string");
                    expect(body.name).to.be.a("string");
                    expect(body.abilities).to.be.a("array");
                    body.abilities.forEach((ability) => {
                        expect(ability).to.be.a("string");
                    });
                    expect(body.faction).to.be.a("object");
                    expect(body.faction.uuid).to.be.a("string");
                    expect(body.faction.name).to.be.a("string");
                    expect(body.image).to.be.a("string");
                    expect(body.object_shape).to.be.a("string");
                    expect(body.description).to.be.a("string");
                    expect(body.frame_number).to.be.a("string");
                    expect(body.created_at).to.be.a("string");
                    expect(body.updated_at).to.be.a("string");
                });
            });
    });
});
