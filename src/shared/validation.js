const changeCase = require("./changeCase");
const { snakeCase } = require("change-case");

// Helper functions

function arrayValuesToSnakeCase(o) {
    if (o instanceof Array) {
        let response = o.map(function (value) {
            if (typeof value === "object") {
                value = changeCase({ object: value, changeTo: "snakeCase" });
            }
            if (typeof value === "string") {
                value = snakeCase(value);
            }
            return value;
        });
        return response;
    } else {
        throw new Error("param is not an array");
    }
}

//----Squema for requiredKeys parameter -----------------------------
//
/* const validBodyKeys = {
    tripName: {
        isRequired: true,
        value: tripName,
        validTypes: ["string"],
    },
    fromDate: {
        isRequired: true,
        value: fromDate,
        validTypes: ["string", null],
    },
    paramToOrder: {
        isRequired: true,
        value: orderBy?.param_to_order,
        validTypes: ["string"],
        validValues: ["name", "created_at", "date_start"],
    },
    wayToOrder: {
        isRequired: true,
        value: orderBy?.way_to_order,
        validTypes: ["string"],
        validValues: [WayToOrderEnum.ASC, WayToOrderEnum.DESC],
    },
}; */
// ------------------------------------------------------------------

const validateBodyKeys = (bodyKeys) => {
    let missingParams = [];
    let invalidDataTypes = [];
    let invalidValues = [];

    Object.keys(bodyKeys).forEach((key) => {
        let value = bodyKeys[key]?.isArrayOfValues ? undefined : bodyKeys[key]?.value;
        let arrayOfValues = bodyKeys[key]?.isArrayOfValues ? bodyKeys[key]?.value : undefined;

        let typeValue = value === null ? null : typeof value;

        let validTypes = bodyKeys[key]?.validTypes;
        let validValues = bodyKeys[key]?.validValues;
        let isRequired = bodyKeys[key]?.isRequired;

        if (!isRequired) validTypes.push(null);
        if (!isRequired && validValues) validValues.push(null);

        if (isRequired && value === undefined && !arrayOfValues) missingParams.push(key);
        if (value !== undefined && !validTypes.includes(typeValue)) invalidDataTypes.push(key);

        if (arrayOfValues) {
            arrayOfValues.forEach((value) => {
                if (validValues && !validValues.includes(value)) invalidValues.push(key);
            });
        } else {
            value !== undefined && validValues && !validValues.includes(value) && invalidValues.push(key);
        }
    });

    if (missingParams.length > 0) {
        throw new Error(
            JSON.stringify({
                httpCode: 400,
                code: "INVALID_PARAMETERS",
                description: `Missing parameters: ${arrayValuesToSnakeCase(missingParams)}, check the API documentation`,
            })
        );
    }
    if (invalidDataTypes.length > 0) {
        throw new Error(
            JSON.stringify({
                httpCode: 400,
                code: "INVALID_DATA_TYPE",
                description: `Invalid data type at keys: ${arrayValuesToSnakeCase(invalidDataTypes)}, check the API documentation`,
            })
        );
    }
    if (invalidValues.length > 0) {
        throw new Error(
            JSON.stringify({
                httpCode: 400,
                code: "INVALID_VALUE",
                description: `Invalid values at keys: ${arrayValuesToSnakeCase(invalidValues)}, check the API documentation`,
            })
        );
    }
};

const isMailFormat = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    return emailRegex.test(email);
};

module.exports = {
    validateBodyKeys,
    isMailFormat,
};
