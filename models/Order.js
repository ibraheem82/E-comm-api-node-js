import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate random numbers for order
// * Generates a random string of characters and numbers, converts it to uppercase.

/*
 *() Math.random(): This function returns a floating-point, pseudo-random number in the range from 0 inclusive to 1 exclusive. In other words, it generates a random number between 0 and just less than 1.

*() .toString(36): The toString() method converts a number to a string. The 36 parameter specifies that the number should be converted to a string representation using base-36 numbering system. Base-36 includes digits 0-9 and lowercase letters a-z.

*() .substring(7): This method extracts a portion of a string. In this case, it starts extracting from the character at index 7 until the end of the string. This effectively truncates the beginning of the string.

*() .toLocaleUpperCase(): This method converts all characters in a string to uppercase letters according to the locale of the environment. However, since the generated string consists of lowercase letters and digits only, the result will be the same as converting it directly to uppercase.
*/
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();


// * Generates a random number between 1000 and 91000.
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    //for stripe payment
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    //For admin
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//compile to form model
const Order = mongoose.model("Order", OrderSchema);

export default Order;
