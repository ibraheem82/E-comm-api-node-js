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
    const products = await Product.find({ _id: { $in:orderItems }})
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
    // Convert order items to have same structure that stripe need.
    // for each thing in the orderItems
    /*
    Transforms an array of order items (orderItems) into a format compatible with Stripe's Checkout API. Each item is likely an object with properties like name, description, price, and quantity.
    .map(): Iterates over the orderItems array, converting each item into a new object.
    */
    const convertedOrders = orderItems.map((item)=> {
        return{
            price_data:{
                currency:'usd',
                product_data:{
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount : item?.price * 100,
            },

            quantity: item?.qty
        };

    });

    //  Initiates the creation of a Stripe Checkout session.
    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata:{
            // access to the order id inside the wenhook.
            orderId : JSON.stringify(order?._id),
        },
        // Indicates this is a session for collecting payment.
        mode:'payment',
        success_url:'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
    res.send({
        // The generated URL where Stripe will host the actual checkout page.
        url:session.url
    });
    
});
