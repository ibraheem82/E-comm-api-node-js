//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Mongoose schema called ProductSchema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    // ! ref: "Category" Establishes a relationship between the product and a likely separate "Category" model
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      // ! Restricts the valid values for sizes to only those specified in the list.
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },

    user: {
      // Establishes a relationship between the product and a "User" model, storing a user's ObjectID.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    images: [
      {
        type: String,
        default: "https://via.placeholder.com/150",
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    //* Tells Mongoose to automatically add createdAt and updatedAt fields to your documents, tracking when they were created and last modified.
    timestamps: true,
    // Configures how your schema is converted into JSON. The virtuals: true part ensures that any virtual fields you might define (not present in the database) are included in the JSON output.
    toJSON: { virtuals: true },
  }
);

/**
 * What are Virtuals?

Virtuals are fields that are not saved directly in your MongoDB database collection.
They are calculated or derived dynamically when you access them from a document.
They offer flexibility by allowing you to compute values on the fly without storing redundant data.
 */

// Virtuals
// qty left

ProductSchema.virtual('qtyLeft').get(function(){
  const product = this
  return product.totalQty - product.totalSold;
});






// Total rating

/**
 * Purpose: Computes the total number of reviews associated with a product.
Logic:
(this) inside the function refers to the current product document.
It accesses the reviews array (populated from the relationship defined earlier) and gets its length.
 */
ProductSchema.virtual('totalReviews').get(function(){
const product = this;
return product?.reviews?.length;
});


// Average rating

/** *
 * Purpose: Calculates the average rating of a product based on its reviews.
Logic:
It iterates over the reviews array, summing up the rating of each review.
It calculates the average by dividing the total rating by the number of reviews.
.toFixed(1) formats the average to one decimal place.
 */
ProductSchema.virtual('averageRating').get(function(){
  let ratingsTotal = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating
  });
  // Calculate average rating.
  const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(1);
  return averageRating;
});

// * creates a Mongoose model named "Product" based on your ProductSchema.
const Product = mongoose.model("Product", ProductSchema);
export default Product