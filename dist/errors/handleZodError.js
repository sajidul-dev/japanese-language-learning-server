"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: String(issue?.path[issue.path.length - 1]),
            message: issue?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages: errors,
    };
};
exports.default = handleZodError;
