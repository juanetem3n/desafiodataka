const {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    headerCase,
    noCase,
    paramCase,
    pascalCase,
    pathCase,
    sentenceCase,
    snakeCase,
} = require("change-case");

module.exports = function changeCase({ object, changeTo }) {
    let newObject;
    const changeCaseFunctions = {
            camelCase,
            capitalCase,
            constantCase,
            dotCase,
            headerCase,
            noCase,
            paramCase,
            pascalCase,
            pathCase,
            sentenceCase,
            snakeCase,
        },
        changeToCase = changeCaseFunctions[changeTo];
    if (!changeToCase) {
        throw new Error(`Cannot change to ${changeTo}, please review the documentation`);
    }
    if (object instanceof Array) {
        return object.map(function (value) {
            if (typeof value === "object") {
                value = changeCase({ object: value, changeTo });
            }
            return value;
        });
    } else {
        newObject = {};
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                const newKey = changeToCase(key);
                var value = object[key];
                if (Array.isArray(value) || (value !== undefined && value !== null && value.constructor === Object)) {
                    value = changeCase({ object: value, changeTo });
                }
                newObject[newKey] = value;
            }
        }
    }
    return newObject;
};
