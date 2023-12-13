"use strict";
const lambdaHandler = require("../../shared/lambdaHandler"),
    Response = require("../../shared/response");
const { errorHandler } = require("../../shared/error/errorHandler"),
    { validateBodyKeys } = require("../../shared/validation");
const Transformer = require("../models/transformer");
const { getTransformerFromPrimaryKey, getTransformerList } = require("../controllers/transformerController");

module.exports.query = lambdaHandler(async (event, context, callback) => {
    /**
     * @desc gets an existing transformer from the db
     **/
    let additionalHeaders = {};
    try {
        const uuid = event?.pathParameters,
            requiredKeys = {
                uuid: {
                    isRequired: false,
                    value: uuid,
                    validTypes: ["string"],
                },
                
            };

        validateBodyKeys(requiredKeys);

        let response = uuid ? [await getTransformerFromPrimaryKey({ transformer: new Transformer({ uuid, name, abilities, faction, image, object_shape, description, created_at, updated_at,frame_number }) })] : await getTransformerList();
        response = response.map((transformer) => {
            return transformer.get();
        });

        callback(null, new Response(200, response, additionalHeaders).value);
    } catch (error) {
        console.error(error);
        return errorHandler(error);
    }
});
