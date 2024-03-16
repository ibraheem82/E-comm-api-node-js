import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Review from "../models/Review.js";




// @desc Create new review
// @route POST /api/v1/reviews
// @access Private/Admin



export const creatReviewCtrl = asyncHandler(async(req, res) => {

    const {product, message, rating} = req.body;

    // find product by it id
    const {productID} = req.params;
    const productFound = await Product.findById(productID).populate('reviews') // eagerly load existing reviews associated with the product.
    if(!productFound){
        throw new Error('Product Not Found');
    }

    // ! checking if the user already reviewed the project or not.
    /*
   ()-> Checks if the current user has already submitted a review for this product:
   ()->  Compares the review's associated user ID with the ID of the currently logged-in user.
   ()-> 
    */
const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user.toString() === req.userAuthId.toString();
});

if(hasReviewed){
    throw new Error('Your have already reviewed this product.');
}


    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user:req.userAuthId
    });

    // ! after successfully creating the review push it into the product found.
    //  Adds the newly created review's ID to the product's list of reviews.
    productFound.reviews.push(review?._id)
    // ! Then resave the product
    await productFound.save();
    res.json({
        status: "success",
        message: "Review created successfully✅",
    });
});
