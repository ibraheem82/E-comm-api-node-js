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
    console.log(req.query)
    let productQuery = Product.find();

    // * SEARCHING PRODUCTS BY NAME.
    if(req.query.name){
        productQuery = productQuery.find({
            name:{ $regex: req.query.name, $options:"i" },
        });
    }


    // * filter PRODUCTS BY BRAND.
    if(req.query.brand){
        productQuery = productQuery.find({
            brand:{ $regex: req.query.brand, $options:"i" },
        });
    }


    // * filter by category.
    if(req.query.category){
        productQuery = productQuery.find({
            category:{ $regex: req.query.category, $options:"i" },
        });
    }


        // * filter by color.
    if(req.query.color){
        productQuery = productQuery.find({
            colors:{ $regex: req.query.color, $options:"i" },
        });
    }

    // * filter by size.
    if(req.query.size){
        productQuery = productQuery.find({
            sizes:{ $regex: req.query.size, $options:"i" },
        });
    }

    // * filter by price range.
    if(req.query.price){
        const priceRange = req.query.price.split("-");
        productQuery = productQuery.find({
                price: {$gt: priceRange[0], $lte: priceRange[1]},
        });
    }

         

    const products = await productQuery;
    res.json({
        status: "success",
        products,
    })
});