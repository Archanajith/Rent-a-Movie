const ordersModel = require('../models/order.model.server');
const usersModel = require('../models/user.model.server');
const movieModel = require('../models/movies.model.server');
const mongodb = require('mongodb');

getAllOrders = () => {
    ordersModel.find({}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    })
};

async function getCustomerFromEmail(email) {
    return usersModel.findOne({email: email});
}

async function getOrdersForCustomer(email) {
    let customer = await getCustomerFromEmail(email);
    let orders = await ordersModel.find({'customer': customer._id});
    return orders;
}

async function getMovieForOrder(movieId) {
    let movie = await movieModel.findOne({_id: new mongodb.ObjectId(movieId.id)});
    return movie;
}

async function getCustomerFromId(userId) {
    return usersModel.find({_id: new mongodb.ObjectId(userId)});
}

async function createOrder(orderJson) {
    let customerIP = await getCustomerFromEmail(orderJson.user_id);
    let movie = await getMovieForOrder(orderJson.movie_id);
    let today = new Date();
    let returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);
    let order = new ordersModel({
                                    item: movie._id,
                                    quantity: 1,
                                    orderdate: today,
                                    returndate: returnDate,
                                    amount: orderJson.amount,
                                    coupon: orderJson.coupon,
                                    customer: customerIP._id
                                });
    let orderCreated = await ordersModel.create(order);
    customerIP.customer.availableBalance =
        customerIP.customer.availableBalance - (orderJson.amount - orderJson.coupon);
    await usersModel.update({_id: customerIP._id}, {$set: customerIP});
    return orderCreated;
}

async function removeOrder(orderid) {
    return await ordersModel.deleteOne({_id: new mongodb.ObjectId(orderid)});
}

module.exports =
    {
        getOrdersForCustomer,
        getAllOrders,
        createOrder,
        removeOrder
    };