/*
Here we are creating a middleware to handle errors in our application. 
This middleware will catch any errors that occur during the request-response cycle 
and send a structured JSON response back to the client.
*/
const errorMiddleware =async(err, req, res, next) => {
    const statusCode = err.status ?? res.statusCode ?? 500; 
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",     
        stack: process.env.NODE_ENV === "production" ? null : err.stack,// here condition is used to check if the environment is production or not, if it is production then stack trace will not be sent in response for security reasons.
        ...(err.errors?.length > 0 && { 
            errors: err.errors.map((error) => ({
                field: error.path   ,
                message: error.msg,
            })),
        }),
    });
}

export default errorMiddleware;
