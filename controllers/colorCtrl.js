import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";
import Color from "../models/Color.js";
// @desc Create new color
// @route POST /api/v1/color
// @access Pivate/admin
export const createColorCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const colorFound = await Color.findOne({name})
    if(colorFound){
        throw new Error('color already exists⚠')
    }

    // create
    const color = await Color.create({
        name: name.toLowerCase(),
        // attaching user to it.
        user: req.userAuthId,
    })

    res.json({
        status:"success",
        message: "color created successfully",
        color,
    })
})



// @desc Get all colors
// @route GET /api/colors
// @access Public
export const getAllColorsCtrl = asyncHandler(async(req, res) => {
    const colors = await Color.find();

    res.json({
        status:"success",
        message: "colors fetched",
        colors,
    });
});


// @desc Get single color
// @route GET /api/colors/:id
// @access Public

export const getSingleColorCtrl = asyncHandler(async(req, res) => {
    const color  = await Color.findById(req.params.id);

    res.json({
        status:"success",
        message: " fetched",
        color,
    });
});



// @desc Update Color
// @route PUT /api/colors/:id
// @access Private/admin

export const updateColorCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;

    const color = await Color.findByIdAndUpdate(req.params.id,
         {
         name
    }, {
        new: true,
    }
    );
    
    res.json({
        status: "success",
        message: "Color updated successfully✅",
        color
    });
});




// @desc Delete Color
// @route GET /api/colors/:id
// @access Pivate/admin
export const deleteColorCtrl = asyncHandler(async(req, res) => {
    await Color.findByIdAndDelete(req.params.id);
       res.json({
           status: "success",
           message: "Color deleted successfully✅",
       });
})