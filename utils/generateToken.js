import  jwt  from "jsonwebtoken";

// -> Responsible for generating tokens for users.
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn:'5d'});
}

export default generateToken;