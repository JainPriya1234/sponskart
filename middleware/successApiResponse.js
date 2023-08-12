const sendSuccessApiResponse = (message, statusCode = 200) => {
    return {
        message:message,
        error : false,
        code : statusCode
    };
};

module.exports = { sendSuccessApiResponse};