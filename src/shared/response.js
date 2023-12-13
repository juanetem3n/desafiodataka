
module.exports = class Response {
    constructor(statusCode, data, responseHeaders, traces = []) {
        if (typeof data === "string") {
            data = {
                message: data,
            };
        }

        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Expose-Headers": "x-amzn-Remapped-Authorization",
        };

        if (responseHeaders) {
            headers = { ...responseHeaders, ...headers };
        }

        this._response = {
            statusCode: statusCode,
            body: JSON.stringify(data),
            headers: headers,
        };

    }

    get value() {
        return this._response;
    }
};
