import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc Create new Product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async(req, res) => {
    const {name, description, category, sizes, colors, user, price, totalQty, brand} = req.body;

    const productExist = await Product.findOne({name});
    if(productExist){
        throw new Error("Product already exist⚠")
    }

    const product = await Product.create({
        name,
         description, 
         category,
          sizes,
          colors, 
          user : req.userAuthId,
          price,
          totalQty,
          brand,
    });

    res.json({
        status:'success',
        message: 'Product created Successfully✅',
        product
    });
});



