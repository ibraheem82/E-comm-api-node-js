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


// Virtuals
// Total rating

ProductSchema.virtual('totalReviews').get(function(){
const product = this;
return product?.reviews?.length;
});

// Average rating
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

const Product = mongoose.model("Product", ProductSchema);
export default Product