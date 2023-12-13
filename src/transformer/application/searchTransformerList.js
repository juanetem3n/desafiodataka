"use strict";
const lambdaHandler = require("../../shared/lambdaHandler"),
    Response = require("../../shared/response"),
    changeCase = require("../../shared/changeCase");
const { errorHandler } = require("../../shared/error/errorHandler"),
    { validateBodyKeys } = require("../../shared/validation");
const { getTransformerFactionFromFactionName } = require("../controllers/transformerFactionController");
const { getTransformerList } = require("../controllers/transformerController");

module.exports.query = lambdaHandler(async (event, context, callback) => {
    /**
     * @desc searches a transformer
     **/
    let additionalHeaders = {};
    try {
        const payload = typeof event.body === "string" ? JSON.parse(event.body) : event.body,
            { name: name, faction_name: factionName, data_per_page: dataPerPage, page: page, order_by: orderBy } = payload,
            requiredKeys = {
                name: {
                    isRequired: false,
                    value: name,
                    validTypes: ["string"],
                },
                factionName: {
                    isRequired: false,
                    value: factionName,
                    validTypes: ["string"],
                    validValues: ["Autobot", "Decepticon", "The creators"],
                },
                dataPerPage: {
                    value: dataPerPage,
                    validTypes: ["number"],
                    isRequired: true,
                },
                page: {
                    value: page,
                    validTypes: ["number"],
                    isRequired: true,
                },
                paramToOrder: {
                    value: orderBy?.param_to_order,
                    validTypes: ["string"],
                    validValues: ["name", "faction", "object_shape", "created_at", "updated_at"],
                    isRequired: true,
                },
                wayToOrder: {
                    value: orderBy?.way_to_order,
                    validTypes: ["string"],
                    validValues: ["ascending", "descending"],
                    isRequired: true,
                },
            };

        validateBodyKeys(requiredKeys);

        let transformerList = await getTransformerList();

        let transformerFilterList = transformerList.filter((item) => {
            return item.name?.includes(name) || item.factionName?.includes(factionName);
        });

        transformerFilterList = transformerFilterList.map((transformer) => {
            return transformer.get();
        });

        let response = {
            data: transformerFilterList,
            data_per_page: 6,
            page: 1,
            total_data: transformerFilterList.length,
            total_data_sent: transformerFilterList.length,
            total_pages: transformerFilterList.length < 6 ? 1 : Math.floor(transformerFilterList.length / 6) + 1,
        };

        callback(null, new Response(200, response, additionalHeaders).value);
    } catch (error) {
        console.error(error);
        return errorHandler(error);
    }
});
