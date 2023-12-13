const neverlandErrorList = require("./errorList");
const Response = require("../response");

const errorHandler = (error) => {
    try {
        if (neverlandErrorList[error.message]) {
            return new Response(neverlandErrorList[error.message]["httpCode"], {
                message: {
                    code: neverlandErrorList[error.message].code,
                    description: neverlandErrorList[error.message].description,
                },
            }).value;
        }
        const customError = JSON.parse(error.message);
        return new Response(customError.httpCode, {
            message: {
                code: customError.code,
                description: customError.description,
            },
        }).value;
    } catch (unhandledError) {
        console.log("unhandledError");
        console.log(error.message);
        return new Response(500, {
            message: {
                code: "UNHANDLED_ERROR",
                description: error.message,
            },
        }).value;
    }
};

const launchError = ({ errorCode, newError }) => {
    if (newError) {
        throw new Error(errorCode);
    } else {
        throw Error(errorCode);
    }
};

module.exports = { errorHandler, launchError };
