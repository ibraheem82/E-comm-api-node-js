export const globalErrHandler = (err, req, res, next) => {
    // -> Target where the error is coming from.
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode: 500;
    const message = err?.message;
    

    res.status(statusCode).json({
        stack,
        message,
    });
};