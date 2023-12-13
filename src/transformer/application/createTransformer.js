"use strict";
const lambdaHandler = require("../../shared/lambdaHandler"),
    Response = require("../../shared/response");
const { errorHandler } = require("../../shared/error/errorHandler"),
    { validateBodyKeys } = require("../../shared/validation");
const { getTransformerFactionFromFactionName } = require("../controllers/transformerFactionController");
const Transformer = require("../models/transformer");
const { insertTransformer } = require("../controllers/transformerController");

module.exports.command = lambdaHandler(async (event, context, callback) => {
    /**
     * @desc creates a new transformer and returns the uuid if successful
     **/
    let additionalHeaders = {};
    try {
        const payload = typeof event.body === "string" ? JSON.parse(event.body) : event.body,
            {
                name: name,
                description: description,
                faction_name: factionName,
                abilities: abilities,
                object_shape: objectShape,
                image: image,
                frame_number: frameNumber,
            } = payload,
            requiredKeys = {
                name: {
                    isRequired: true,
                    value: name,
                    validTypes: ["string"],
                },
                description: {
                    isRequired: true,
                    value: description,
                    validTypes: ["string"],
                },
                factionName: {
                    isRequired: true,
                    value: factionName,
                    validTypes: ["string"],
                    validValues: ["Autobot", "Decepticon", "The creators"],
                },
                abilities: {
                    isRequired: true,
                    value: abilities,
                    validTypes: ["object"],
                },
                objectShape: {
                    isRequired: true,
                    value: objectShape,
                    validTypes: ["string"],
                },
                image: {
                    isRequired: true,
                    value: image,
                    validTypes: ["string"],
                },
                frameNumber: {
                    isRequired: true,
                    value: frameNumber,
                    validTypes: ["string"],
                }
            };

        validateBodyKeys(requiredKeys);

        const transformer = await new Transformer({
            name,
            description,
            faction: await getTransformerFactionFromFactionName({ name: factionName }),
            abilities,
            objectShape,
            image,
            frameNumber,
        })
            .generateUuid()
            .generateCreatedAt()
            .generateUpdatedAt();

        await insertTransformer({ transformer });

        const response = transformer.getUuid();

        callback(null, new Response(200, response, additionalHeaders).value);
    } catch (error) {
        console.error(error);
        return errorHandler(error);
    }
});
