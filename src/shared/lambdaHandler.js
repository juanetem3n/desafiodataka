module.exports = (lambdaHandler) => {
    return async (event, context, callback) => {
        const response = await lambdaHandler(event, context, callback);
        return response;
    };
};
