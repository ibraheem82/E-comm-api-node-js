import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

// @ this code snippet defines a middleware function that:

// ->  Extracts an authentication token from the request headers.
// -> Verifies the validity of the token.
// -> If valid, attaches the authenticated user's ID to the request object for use in subsequent route handlers.
// -> If invalid, throws an error to prompt the user to re-authenticate.

// * Exporting a Middleware Function:
export const isLoggedIn = (req, res, next) => {
    // retrieve an authentication token from the request headers and store it in the token variable.
    const token = getTokenFromHeader(req)

    // passing the retrieved token as an argument. The function validates the token and, if successful, returns a decoded user object containing information about the authenticated user.
    const decodedUser = verifyToken(token);
    // checks if the verifyToken function returned a valid decodedUser object:

    // If no valid user object was returned, an error is thrown, indicating an invalid or expired token. This error would typically be handled by an error-handling middleware, potentially redirecting the user to a login page.
    if(!decodedUser){
        throw new Error('Invalid/Expired token, please login again.');
    } else{
        // The authenticated user's ID is extracted from the decodedUser object and attached to the request object (req) as a property named userAuthId. This makes the user's ID accessible in subsequent route handlers
        req.userAuthId = decodedUser?.id;

        // the next function, which is a standard practice in middleware functions to pass control to the next middleware function in the chain or, if no more middleware is present, to the route handler that matches the request.
        next();
    }
}