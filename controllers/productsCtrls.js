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


// @desc Get All Product
// @route GET /api/v1/products
// @access Public

export const getProductsCtrl = asyncHandler(async(req, res) => {
    let productQuery = Product.find();

    // * SEARCHING PRODUCTS.
    if(req.query.name){
        productQuery = productQuery.find({
            name:{ $regex: req.query.name, $options:"i" },
        });
    }
    const products = await productQuery;

    res.json({
        status: "success",
        products,
    })
});