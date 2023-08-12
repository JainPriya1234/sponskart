const sendSuccessApiResponse = (message="successfully created ", statusCode = 200) => {
    return {
        message: message,
        error : false,
        code : statusCode
    };
};

module.exports = { sendSuccessApiResponse};