const sendErrorForDev = (err, res) => {
    res.status(err.status.code || 500).json({
        message: err.message,
        error: true,
        code:err.status.code,
        stack: err.stack,
    });
};

const errorHandlerMiddleware = (err, req, res, next) => {
    err.status = err.status || { code: 500, message: "error" };
    sendErrorForDev(err, res);
};

module.exports = errorHandlerMiddleware;