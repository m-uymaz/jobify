"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: 500,
        msg: err.message || 'Something went wrong, try again later'
    };
    if (err.name === 'ValidationError') {
        defaultError.msg = 'Please, fill out all fields correctly';
    }
    if (err.code === 11000) {
        defaultError.msg = 'This email is registered';
    }
    res.status(400).json(defaultError.msg);
};
exports.default = errorHandlerMiddleware;
