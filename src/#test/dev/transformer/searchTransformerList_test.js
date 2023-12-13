/* eslint-env mocha */
"use strict";
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    dirtyChai = require("dirty-chai"),
    expect = require("chai").expect;
chai.use(chaiHttp);
const mochaPlugin = require("serverless-mocha-plugin");
mochaPlugin.chai.use(dirtyChai);

const { insertDummyInDb, deleteDummyFromDb } = require("../#dbQueries/transformer_queries"),
    { createNewDummy, createNewDummyOptimus, createNewDummyBumblebee, createNewDummyMegatron } = require("./common");

const changeCase = require("../../../../src/shared/changeCase");

const PARENT_CONTEXT = "",
    SERVICE = "transformer",
    SERVICE_PATH = `../../../src/${PARENT_CONTEXT}${SERVICE}`,
    CLASS_NAME = "Transformer",
    SUBCLASS_NAME = "",
    ACTION = "search",
    RESPONSE_TYPE = "list",
    LAMBDA_TYPE = "query";

const wrapped = mochaPlugin.getWrapper(
    `${LAMBDA_TYPE}`,
    `${SERVICE_PATH}/application/${ACTION}${CLASS_NAME}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}.js`,
    `${LAMBDA_TYPE}`
);

describe(`${SERVICE} ${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""}`, () => {
    const TEST_TRANSFORMER_UUID = "123456",
        ANOTHER_TEST_TRANSFORMER_UUID = "789123",
        OPTIMUS_TEST_TRANSFORMER_UUID = "1",
        BUMBLEBEE_TEST_TRANSFORMER_UUID = "2",
        MEGATRON_TEST_TRANSFORMER_UUID = "3";

    beforeEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: OPTIMUS_TEST_TRANSFORMER_UUID } });
        global.testElement3 = createNewDummyOptimus({ uuid: OPTIMUS_TEST_TRANSFORMER_UUID });
        await insertDummyInDb({ dummy: global.testElement3 });
        await deleteDummyFromDb({ dummy: { uuid: BUMBLEBEE_TEST_TRANSFORMER_UUID } });
        global.testElement4 = createNewDummyBumblebee({ uuid: BUMBLEBEE_TEST_TRANSFORMER_UUID });
        await insertDummyInDb({ dummy: global.testElement4 });
        await deleteDummyFromDb({ dummy: { uuid: MEGATRON_TEST_TRANSFORMER_UUID } });
        global.testElement5 = createNewDummyMegatron({ uuid: MEGATRON_TEST_TRANSFORMER_UUID });
        await insertDummyInDb({ dummy: global.testElement5 });
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
        global.testElement1 = createNewDummy({ uuid: TEST_TRANSFORMER_UUID })
            .setName("Mazinger Z")
            .setDescription(
                "Kouji Kabuto, is the main character and pilot of super robot Mazinger Z. He makes a comeback in the sequel series Great Mazinger where he helps defeating the Mycenaean Empire. He also features in Grendizer as Duke Fleeds friend and sidekick. His voice actor is Hiroya Ishimaru in the Japanese version of Mazinger Z and Mazinkaiser, and in Toeis 1970s English dub, he was voiced by Dando Kluever. His voice actor in Tranzor Z, in which he was renamed Tommy Davis, was Gregg Berger. In the English version of Mazinkaiser, his voice actor is Robert Newell while in Shin Mazinger Shougeki! Z Hen, his voice is played by Kenji Akabane. In Mazinger Z: Infinity, Koji is voiced by Showtaro Morikubo while in the English dub, he is voiced by Wayne Grayson. He is a staple character of Super Robot Wars and appears in nearly every incarnation, the exceptions being Super Robot Wars UX and the OG series. Kabutos date of birth is November 12."
            )
            .setFaction({ uuid: "th3cr34t-0rs7-4fd0-a0ff-11ee04d80c85", name: "The creators" })
            .setImage(
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rtve.es%2Fnoticias%2F20180118%2Fmazinger-z-debuta-cines-espanoles-40-anos-despues%2F1661386.shtml&psig=AOvVaw3L9wi94KX1Q99BRYs6uSKD&ust=1702471003930000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjFufX0iYMDFQAAAAAdAAAAABAD"
            )
            .setAbilities(["Passing technical assignment", "Powerful rockets", "Advanced Go knowledge"])
            .setObjectShape("robot");
        global.testElement1.frameNumber = "0";
        await insertDummyInDb({ dummy: global.testElement1 });
        await deleteDummyFromDb({ dummy: { uuid: ANOTHER_TEST_TRANSFORMER_UUID } });
        global.testElement2 = createNewDummy({ uuid: ANOTHER_TEST_TRANSFORMER_UUID })
            .setName("Mazinger Z")
            .setDescription(
                "Kouji Kabuto, is the main character and pilot of super robot Mazinger Z. He makes a comeback in the sequel series Great Mazinger where he helps defeating the Mycenaean Empire. He also features in Grendizer as Duke Fleeds friend and sidekick. His voice actor is Hiroya Ishimaru in the Japanese version of Mazinger Z and Mazinkaiser, and in Toeis 1970s English dub, he was voiced by Dando Kluever. His voice actor in Tranzor Z, in which he was renamed Tommy Davis, was Gregg Berger. In the English version of Mazinkaiser, his voice actor is Robert Newell while in Shin Mazinger Shougeki! Z Hen, his voice is played by Kenji Akabane. In Mazinger Z: Infinity, Koji is voiced by Showtaro Morikubo while in the English dub, he is voiced by Wayne Grayson. He is a staple character of Super Robot Wars and appears in nearly every incarnation, the exceptions being Super Robot Wars UX and the OG series. Kabutos date of birth is November 12."
            )
            .setFaction({ uuid: "th3cr34t-0rs7-4fd0-a0ff-11ee04d80c85", name: "The creators" })
            .setImage(
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rtve.es%2Fnoticias%2F20180118%2Fmazinger-z-debuta-cines-espanoles-40-anos-despues%2F1661386.shtml&psig=AOvVaw3L9wi94KX1Q99BRYs6uSKD&ust=1702471003930000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjFufX0iYMDFQAAAAAdAAAAABAD"
            )
            .setAbilities(["Passing technical assignment", "Powerful rockets", "Advanced Go knowledge"])
            .setObjectShape("robot");
        global.testElement2.frameNumber = "0";
        await insertDummyInDb({ dummy: global.testElement2 });
    });

    afterEach(async () => {
        await deleteDummyFromDb({ dummy: { uuid: TEST_TRANSFORMER_UUID } });
        await deleteDummyFromDb({ dummy: { uuid: ANOTHER_TEST_TRANSFORMER_UUID } });
        await deleteDummyFromDb({ dummy: { uuid: OPTIMUS_TEST_TRANSFORMER_UUID } });
        await deleteDummyFromDb({ dummy: { uuid: BUMBLEBEE_TEST_TRANSFORMER_UUID } });
        await deleteDummyFromDb({ dummy: { uuid: MEGATRON_TEST_TRANSFORMER_UUID } });
    });

    it(`${ACTION}${SUBCLASS_NAME}${RESPONSE_TYPE === "list" ? "List" : ""} ${SERVICE}`, async () => {
        // WARNING: This test have to end properly.
        // Remember to use var to declare body as the documentator is able to recognize it,
        // and don't use any variables inside the body declaration (the documentator have to read the data type for it)
        var body = {
            name: "Mazinger Z",
            faction_name: "The creators",
            page: 1,
            data_per_page: 6,
            order_by: { param_to_order: "name", way_to_order: "ascending" },
        };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                console.log(response);
                const body = JSON.parse(response.body);
                expect(response.statusCode).to.be.equal(200);
                expect(body.total_data).to.be.equal(2);
                expect(body.total_pages).to.be.equal(1);
                const bodyInString = JSON.stringify(changeCase({ object: body, changeTo: "camelCase" }));
                expect(bodyInString.includes(JSON.stringify(global.testElement1))).to.be.equal(true);
                expect(bodyInString.includes(JSON.stringify(global.testElement2))).to.be.equal(true);
                expect(bodyInString.includes(JSON.stringify(global.testElement3))).to.be.equal(false);
                expect(bodyInString.includes(JSON.stringify(global.testElement4))).to.be.equal(false);
                expect(bodyInString.includes(JSON.stringify(global.testElement5))).to.be.equal(false);
            });
    });
    it("response body key check", async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        const body = {
            name: "Mazinger Z",
            faction_name: "The creators",
            page: 1,
            data_per_page: 6,
            order_by: { param_to_order: "name", way_to_order: "ascending" },
        };
        return wrapped
            .run({
                body,
            })
            .then(async (response) => {
                const body = JSON.parse(response.body);
                expect(body).to.have.all.keys("data", "data_per_page", "page", "total_data", "total_data_sent", "total_pages");
                body.data.forEach((body) => {
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
    it(`invalid data type check`, async () => {
        // WARNING: Remember to use const to declare body so the documentator is able to skip it
        var body = {
            name: "Mazinger Z",
            faction_name: "The creators",
            page: "1",
            data_per_page: 6,
            order_by: { param_to_order: "name", way_to_order: "ascending" },
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
        var body = {
            name: "Mazinger Z",
            faction_name: "The creators",
            pagse: 1,
            dataPerPage: 6,
            order_vy: { param_to_order: "name", way_to_order: "ascending" },
        };
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
