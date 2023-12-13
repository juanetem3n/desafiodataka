"use strict";
const lambdaHandler = require("../../shared/lambdaHandler"),
    Response = require("../../shared/response"),
    changeCase = require("../../shared/changeCase");
const { errorHandler } = require("../../shared/error/errorHandler"),
    { validateBodyKeys } = require("../../shared/validation");
const Transformer = require("../models/transformer");
const { getTransformerFromPrimaryKey, updateTransformer } = require("../controllers/transformerController");

module.exports.command = lambdaHandler(async (event, context, callback) => {
    /**
     * @desc updates a transformer and returns the uuid if successful
     **/
    let additionalHeaders = {};
    try {
        const uuid = event?.pathParameters;
        const payload = typeof event.body === "string" ? JSON.parse(event.body) : event.body,
            {
                name: name,
                description: description,
                faction: faction,
                abilities: abilities,
                object_shape: objectShape,
                image: image,
                frame_number: frameNumber,
            } = payload,
            requiredKeys = {
                uuid: {
                    isRequired: true,
                    value: uuid,
                    validTypes: ["string"],
                },
                name: {
                    isRequired: false,
                    value: name,
                    validTypes: ["string"],
                },
                description: {
                    isRequired: false,
                    value: description,
                    validTypes: ["string"],
                },
                faction: {
                    isRequired: false,
                    value: faction,
                    validTypes: ["string"],
                    validValues: ["autobot", "decepticon"],
                },
                abilities: {
                    isRequired: false,
                    value: faction,
                    validTypes: ["array"],
                },
                objectShape: {
                    isRequired: false,
                    value: objectShape,
                    validTypes: ["string"],
                },
                image: {
                    isRequired: false,
                    value: image,
                    validTypes: ["string"],
                },
                frameNumber: {
                    isRequired: false,
                    value: frameNumber,
                    validTypes: ["string"],
                }
            };

        validateBodyKeys(requiredKeys);

        const transformer = await getTransformerFromPrimaryKey({ transformer: new Transformer({ uuid }) });
        await transformer
            .setName(name ? name : transformer.name)
            .setDescription(description ? description : transformer.description)
            .setFaction(faction ? faction : transformer.faction)
            .setAbilities(abilities ? abilities : transformer.abilities)
            .setObjectShape(objectShape ? objectShape : transformer.objectShape)
            .setImage(image ? image : transformer.image)
            .setFrameNumber(frameNumber ? frameNumber : transformer.frameNumber)
            .generateUpdatedAt();

        await updateTransformer({ transformer });
        const response = transformer.getUuid();

        callback(null, new Response(200, response, additionalHeaders).value);
    } catch (error) {
        console.error(error);
        return errorHandler(error);
    }
});
