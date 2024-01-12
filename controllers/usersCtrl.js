import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc Register User
// @route POST /api/v1/users/register
// @access Private/Admin

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



// @desc Login User
// @route POST /api/v1/users/login
// @access Public
export const loginUserCtrl = async(req, res) => {
    const {email, password} = req.body;

    // * Find user in database by email only.

    const userFound = await User.findOne({
        email,
    });

    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status:'success',
            msg:'User logged in successfully✔',
            userFound
        }); 
    } else{
        res.json({
            msg:'Invalid login❌'
        });
    }
}