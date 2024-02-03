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
        name,
        user: req.userAuthId,
    })

    res.json({
        status:"success",
        message: "Category created succefully",
        category,
    })
})