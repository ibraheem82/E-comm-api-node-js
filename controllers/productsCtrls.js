import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
// @desc Create new Product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async(req, res) => {
    const {name, description, category, sizes, colors, price, totalQty, brand} = req.body;

    const productExist = await Product.findOne({name});
    if(productExist){
        throw new Error("Product already exist⚠")
    }


      // find brand
      const brandFound = await Brand.findOne({
        name:brand?.toLowerCase(),
    });

    if(!brandFound){
        throw new Error("Brand not found, please create brand first or check brand name");
    }


    const categoryFound = await Category.findOne({
        name:category,
    });

    if(!categoryFound){
        throw new Error("Category not found, please create category first or check category name");
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

    categoryFound.products.push(product._id);
    await categoryFound.save();


    // Push product into brand

    brandFound.products.push(product._id);
    await brandFound.save();

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

    // ** [Pagination]
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    const pagination = {}

    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    const products = await productQuery.populate('reviews');
    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully✅",
        products,
    });
});




// @desc Get Single Product
// @route GET /api/products/:id
// @access Public

export const getProductCtrl = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    if(!product){
        throw new Error("Product not found⚠")
    }
    res.json({
        status: "success",
        message: "Product fetched successfully✅",
        product
    });
})


// @desc Update Product
// @route GET /api/products/:id/update
// @access Public

export const updateProductCtrl = asyncHandler(async(req, res) => {
    const {name, description, category, sizes, colors, user, price, totalQty, brand} = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, {
         name,
         description, 
         category,
          sizes,
          colors, 
          user : req.userAuthId,
          price,
          totalQty,
          brand,
    }, {
        new: true,
    }
    );
    
    res.json({
        status: "success",
        message: "Product updated successfully✅",
        product
    });
})



// @desc Delete Product
// @route GET /api/products/:id/delete
// @access Public

export const deleteProductCtrl = asyncHandler(async(req, res) => {
 await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Product deleted successfully✅",
    });
})