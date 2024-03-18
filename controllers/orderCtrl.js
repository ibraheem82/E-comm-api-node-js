import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();


// @desc Create new orders
// @route POST /api/v1/orders
// @access Private

// * Stripe instance

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async(req, res) => {
    // get payload(customer, orderItems, shippingAddress, totalPrice)

    const {orderItems, shippingAddress, totalPrice} = req.body;


    // ?Find User
    // associate an order to a user.
    const user = await User.findById(req.userAuthId);
    // check if user has shipping address.
    if(!user?.hasShippingAddress){
        throw new Error("Please provide shipping address");
    }
   
    // check if order is not empty
    if(orderItems?.length <= 0){
        throw new Error('No Order items')
    }
    // Place/create order - save to DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice,
    });



    // Update the product qty
    const products = await Product.find({_id:{$in:orderItems}})
    orderItems?.map(async (order)=>{
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });

        if(product){
            product.totalSold += order.qty;
           
        }
        await product.save();
    });

          // Push order into user
    user.orders.push(order?._id);
    await user.save();
  
    // make payment (stripe)
    // Payment webhook
    // Update the user order
    res.json({
        success: true,
        message: "Order created",
        order,
        user,
    });
});
