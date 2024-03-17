import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc Register User
// @route POST /api/v1/users/register
// @access Private/Admin

export const registerUserCtrl = asyncHandler(async(req, res) => {
    const {fullname, email, password} = req.body;

    // * Check if user exist
    const userExists = await User.findOne({email});
    if (userExists) {
        throw new Error('User already exists ⚠');
    }

    // -> HASHING
    const salt = await bcrypt.genSalt(12);
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
});



// @desc Login User
// @route POST /api/v1/users/login
// @access Public
export const loginUserCtrl = asyncHandler(async(req, res) => {
        const {email, password} = req.body;
    
        // * Find user in database by email only.
    
        const userFound = await User.findOne({
            email,
        });
    
        if(userFound && await bcrypt.compare(password, userFound?.password)){
            res.json({
                status:'success',
                msg:'User logged in successfully✔',
                userFound,
                // -> Assign a unique token to the user.
                token:generateToken(userFound?._id),
            }); 
        } else{
            throw new Error('Invalid login credentials') 
        }
});


// @desc Get user profile
// @route POST /api/v1/users/profile
// @access Private

export const getUserProfile = asyncHandler(async(req, res) => {
    const token = getTokenFromHeader(req)
    // -> Get the verified token
    const verified = verifyToken(token);
    
    res.json({
        msg:"Profile page.",
    });
});


// @desc Update user shipping address
// @route POST /api/v1/users/update/shipping
// @access Private

export const updateShippingAddressCtrl = asyncHandler(async(req, res) => {
    const {firstName, lastName, address, city, postalCode, province, phone} = req.body;
    // Retrieves the user document from the database based on the ID of the authenticated user 
    // verifies the user's access and populates the request object with the authenticated user's ID.
    const user = await User.findByIdAndUpdate(req.userAuthId, {
        // This field is updated with the new address information provided in the request.
        shippingAddress:{
            firstName, lastName, address, city, postalCode, province, phone
        },
        // This flag is set to true to indicate that the user now has a saved shipping address.
        hasShippingAddress: true
    },
    {   
        // This option instructs Mongoose to return the updated user document in the response.
        // Mongoose to return the updated version of the user document after the modification.
        new:true,
    }
    );

    res.json({
        status:"Success",
        message: "User shipping address updated successfully",
        user,
    });
});
