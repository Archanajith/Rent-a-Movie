const db = require('./db');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const couponModel = require('../models/coupons.model.server');
const userModel = require('../models/user.model.server');
const couponAvailableModel = require('../models/couponsavailable.model.server');

getAllCoupons = () => {
    return couponModel.find({});
};

//add code here to create the movie object
addCoupon = (name, discount) => {
    let coupon = new couponModel({name: name, discount: discount});
    return couponModel.create(coupon);
};

async function updateCoupon(name, discount) {
    let coupon = new couponModel({name: name, discount: discount});
    return await couponModel.update({name: name}, {$set: {name: name, discount: discount}});
}

//remove coupon
removeCoupon = (name) => {
    couponModel.deleteOne({name: name}).then(() => {

    }).catch(() => {
        alert("error occurred");
    })
};

async function getCustomer(userId) {
    return await userModel.findOne({_id: new mongodb.ObjectId(userId)});
}

async function addCouponForUser(couponName, userId, couponCount) {
    let user = await getCustomer(userId);
    let couponDB = await couponModel.findOne({name: couponName});
    let couponAvail = new couponAvailableModel({
                                                   count: couponCount,
                                                   customer: user._id,
                                                   coupon: couponDB._id
                                               });
    return await couponAvailableModel.create(couponAvail);
}

async function getCouponForUser(userId) {
    let user = await getCustomer(userId);
    return couponAvailableModel.find({'customer._id': user._id});
}

async function updateCouponAvailed(couponName, userId) {
    let user = await getCustomer(userId);
    let couponDB = await couponModel.findOne({name: couponName});
    return await couponAvailableModel.update({'customer._id': user._id, 'coupon._id': couponDB._id},
                                             {$inc: {count: -1}});
}

module.exports =
    {
        getAllCoupons,
        addCoupon,
        removeCoupon,
        updateCouponAvailed,
        addCouponForUser,
        updateCoupon,
        getCouponForUser
    };
