import User from "../models/User.js";
import bcrypt from "bcryptjs";



export const registerUserCtrl = async(req, res) => {
    const {fullname, email, password} = req.body;

    // * Check if user exist
    const userExists = await User.findOne({email});
    if (userExists) {
        res.json({
            msg: "User already exists⚠",
        });
    }

    // -> HASHING
    const salt = await bcrypt.genSalt(9);
    const hashPassword = await bcrypt.hash(password, salt);

    // @ Create User, Hash user password
    const user = await User.create({
        fullname,
        email,
        password: hashPassword
    });

    res.status(201).json({
        status:'success',
        message: 'User Registered Successfully✅',
        data:user
    });
};