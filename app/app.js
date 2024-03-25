import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
import express from 'express';

import dbConnect from '../config/dbConnect.js';

import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import userRoutes from '../routes/usersRoute.js';
import productRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/ordersRouter.js";
import Order from "../models/Order.js";

// * Database Connection.
dbConnect();
const app = express();

// Stripe webHook

// const stripe = require('stripe')('sk_test_...');
const stripe = Stripe(process.env.STRIPE_KEY);


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_d8d2c3dec676b0506861263f4e4b864813f550c3ae4cc00e14b92bd79484557b";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // console.log(event);
  } catch (err) {
    // console.log(err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type === "checkout.session.completed"){

    // details about that payment, from stripe
    const session = event.data.object;
    const {orderId} = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    // console.log("Wait see ..... -> ",orderId, paymentStatus, paymentMethod, totalAmount, currency);

    // * Find order
    // stripe listen --forward-to localhost:6666/webhookcls
    

    const order = await Order.findByIdAndUpdate(orderId, {
        totalPrice : totalAmount / 100,
        currency,
        paymentMethod,
        paymentStatus,

    },
    {
        new:true,
    }
    );
    console.log(order)
  } else{
    return;
  }

  // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
//       break;
    // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));







// parse incoming datas, meaning the datas coming in the {req}, will be converted as json.
app.use(express.json());

// @Routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/reviews/', reviewRouter);
app.use('/api/v1/orders/', orderRouter);



// * Err Middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;