import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

// @desc Create new brand
// @route POST /api/v1/brand
// @access Pivate/admin
export const createBrandCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const brandFound = await Brand.findOne({name})
    if(brandFound){
        throw new Error('Brand already exists⚠')
    }

    // create
    const brand = await Brand.create({
        name: name.toLowerCase(),
        // attaching user to it.
        user: req.userAuthId,
    })

    res.json({
        status:"success",
        message: "Brand created successfully",
        brand,
    })
})



// @desc Get all brands
// @route GET /api/brands
// @access Public
export const getAllBrandsCtrl = asyncHandler(async(req, res) => {
    const brands = await Brand.find();

    res.json({
        status:"success",
        message: "Brands fetched",
        brands,
    });
});


// @desc Get single brands
// @route GET /api/brands/:id
// @access Public

export const getSingleBrandCtrl = asyncHandler(async(req, res) => {
    const brands = await Brand.findById(req.params.id);

    res.json({
        status:"success",
        message: "Brand fetched",
        brands,
    });
});



// @desc Update Brand
// @route PUT /api/brands/:id
// @access Private/admin

export const updateBrandCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;

    const brand = await Brand.findByIdAndUpdate(req.params.id,
         {
         name
    }, {
        new: true,
    }
    );
    
    res.json({
        status: "success",
        message: "Brand updated successfully✅",
        brand
    });
});




// @desc Delete Brand
// @route GET /api/brands/:id
// @access Pivate/admin
export const deleteBrandCtrl = asyncHandler(async(req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
       res.json({
           status: "success",
           message: "Brand deleted successfully✅",
       });
})