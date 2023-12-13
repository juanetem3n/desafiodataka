"use strict";
const lambdaHandler = require("../../shared/lambdaHandler"),
    Response = require("../../shared/response"),
    changeCase = require("../../shared/changeCase");
const { errorHandler } = require("../../shared/error/errorHandler"),
    { validateBodyKeys } = require("../../shared/validation");
const Transformer = require("../models/transformer");
const { deleteTransformer } = require("../controllers/transformerController");

module.exports.command = lambdaHandler(async (event, context, callback) => {
    /**
     * @desc deletes a transformer and returns 'ok' if successful
     **/
    let additionalHeaders = {};
    try {
        const uuid = event?.pathParameters,
            requiredKeys = {
                uuid: {
                    isRequired: true,
                    value: uuid,
                    validTypes: ["string"],
                },
            };

        validateBodyKeys(requiredKeys);

        await deleteTransformer({ transformer: new Transformer({ uuid }) });
        const response = "ok";

        callback(null, new Response(200, response, additionalHeaders).value);
    } catch (error) {
        console.error(error);
        return errorHandler(error);
    }
});
