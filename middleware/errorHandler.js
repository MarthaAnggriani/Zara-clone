module.exports = (error, req, res, next) => {
    let message = "Internal server error"
    let code = 500

    console.log(error.name, "<<<<<");
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            message = error.errors[0].message;
            code = 400;
            break;
        case "ValidationError": //Tidak ada input email dan password saat login
            message = "Input email and password, please";
            code = 400;
            break;
        case "InvalidInput":
            message = "Invalid email/password";
            code = 401;
            break;
        case "JsonWebTokenError":
        case "TokenExpiredError":
        case "Unauthenticated":
        case "NoToken":
            message = "Unauthenticated";
            code = 401;
            break;
        case "Unauthorized":
            message = "Unauthorized";
            code = 401;
            break;
        case "Forbidden":
            message = "You are not authorized";
            code = 403;
            break;
        case "NotFound":
            message = "Data Not Found";
            code = 404;
            break;
        case "UserNotFound":
            message = "Email is unregistered";
            code = 404;
            break;
        case "CustomerNotFound":
            message = "Email is unregistered";
            code = 404;
            break;
    }
    res.status(code).json({ message });
}