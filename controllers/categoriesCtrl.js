import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

// @desc Create new category
// @route POST /api/v1/categories
// @access Pivate/admin
export const createCategoryCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const categoryFound = await Category.findOne({name})
    if(categoryFound){
        throw new Error('Category already exists')
    }

    // create
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    })

    res.json({
        status:"success",
        message: "Category created succefully",
        category,
    })
})



// @desc Get all categories
// @route GET /api/categories
// @access Public
export const getAllCategoriesCtrl = asyncHandler(async(req, res) => {
    const categories = await Category.find();

    res.json({
        status:"success",
        message: "Categories fetched",
        categories,
    });
});


// @desc Get single category
// @route GET /api/categories/:id
// @access Public

export const getSingleCategoryCtrl = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id);

    res.json({
        status:"success",
        message: "Category fetched",
        category,
    });
});



// @desc Update Category
// @route PUT /api/categories/:id/update
// @access Pivate/admin

export const updateCategoryCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id,
         {
         name
    }, {
        new: true,
    }
    );
    
    res.json({
        status: "success",
        message: "Category updated successfully✅",
        category
    });
});




// @desc Delete Category
// @route GET /api/categories/:id/delete
// @access Pivate/admin
export const deleteCategoryCtrl = asyncHandler(async(req, res) => {
    await Category.findByIdAndDelete(req.params.id);
       res.json({
           status: "success",
           message: "Category deleted successfully✅",
       });
})