const changeCase = require("../../../src/shared/changeCase");

module.exports = class Path {
    constructor(method) {
        const responses = {
            200: { description: "Success" },
            202: { description: "Bucle" },
            302: { description: "Redirection" },
            400: { description: "Invalid parameters or Invalid data type" },
            401: { description: "Token blacklisted" },
            403: { description: "Forbidden" },
            500: { description: "Internal Server Error" },
            502: { description: "Bad Response (the Response is malformed)" },
        };
        switch (method) {
            case "post": {
                this.post = {
                    tags: [],
                    summary: "",
                    description: "",
                    operationId: "",
                    parameters: [],
                    requestBody: {},
                    responses,
                };
                break;
            }
            case "put": {
                this.put = {
                    tags: [],
                    summary: "",
                    description: "",
                    operationId: "",
                    parameters: [],
                    requestBody: {},
                    responses,
                };
                break;
            }
            case "delete": {
                this.delete = {
                    tags: [],
                    summary: "",
                    description: "",
                    operationId: "",
                    parameters: [],
                    responses,
                };
                break;
            }
            case "get": {
                this.get = {
                    tags: [],
                    summary: "",
                    description: "",
                    operationId: "",
                    parameters: [],
                    responses,
                };
                break;
            }
        }
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
    }

    setTags(tags) {
        this.get && (this.get.tags = tags);
        this.post && (this.post.tags = tags);
        this.put && (this.put.tags = tags);
        this.delete && (this.delete.tags = tags);
        this.tags = tags;
        return this;
    }

    addTag(tag) {
        this.get && this.get.tags.push(tag);
        this.post && this.post.tags.push(tag);
        this.put && this.put.tags.push(tag);
        this.delete && this.delete.tags.push(tag);
        return this;
    }

    setSummary(summary) {
        this.get && (this.get.summary = summary);
        this.post && (this.post.summary = summary);
        this.put && (this.put.summary = summary);
        this.delete && (this.delete.summary = summary);
        return this;
    }

    setDescription(description) {
        this.get && (this.get.description = description);
        this.post && (this.post.description = description);
        this.put && (this.put.description = description);
        this.delete && (this.delete.description = description);
        return this;
    }

    setOperationId(operationId) {
        this.get && (this.get.operationId = operationId);
        this.post && (this.post.operationId = operationId);
        this.put && (this.get.operationId = operationId);
        this.delete && (this.get.operationId = operationId);
        return this;
    }

    setRequestBody(requestBody) {
        this.post && (this.post.requestBody = requestBody);
        this.put && (this.put.requestBody = requestBody);
        return this;
    }

    setParameters(parameters) {
        this.get && (this.get.parameters = parameters);
        this.post && (this.post.parameters = parameters);
        this.put && (this.put.parameters = parameters);
        this.delete && (this.delete.parameters = parameters);
        return this;
    }

    addParameter(parameter) {
        this.get && this.get.parameters.push(parameter);
        this.post && this.post.parameters.push(parameter);
        this.put && this.put.parameters.push(parameter);
        this.delete && this.delete.parameters.push(parameter);
        return this;
    }
};
