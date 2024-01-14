import  jwt  from "jsonwebtoken";
// -> Uses the jsonwebtoken library to verify a given JWT.
// -> Employs a secret key from an environment variable for security.
// -> Returns false for invalid tokens, indicating verification failure.
// -> Returns the decoded payload (user information or other data) for valid tokens.




// defines and exports a function named verifyToken that takes a token as its argument and is responsible for verifying its validity.
export const verifyToken = (token) => {

    //  calls the jwt.verify function from the imported library to perform the actual token verification:
// token: The token to be verified.
// process.env.JWT_KEY: The secret key used to sign the token. It's being accessed from an environment variable, which is a good practice for security.
// (err, decoded) => { ... }: A callback function that handles the verification result.
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        // If an error occurs during verification (e.g., invalid signature, expired token), the function returns false to indicate an invalid token.
        if (err) {
            return false;
            // If the verification is successful, the function returns the decoded payload of the token, which typically contains user information or other relevant data.
        }else{
            return decoded;
        }
    })
}