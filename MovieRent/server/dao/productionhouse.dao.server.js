const db = require('./db');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const productionHouseModel = require('../models/productionhouse.model.server');

getAllProductionHouse = () => {
    productionHouseModel.find({}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    });
};

addProductionHouse = (prodHouseIp) => {
    let prodHouse = new productionHouseModel({
                                                 name: prodHouseIp.name,
                                                 established: prodHouseIp.established
                                             });
    return productionHouseModel.create(prodHouse);
};

getProductionHouse = (prodHouseId) => {
    return productionHouseModel.findOne({_id: new mongodb.ObjectId(prodHouseId)});
};

removeProductionHouse = (prodHouseId) => {
    return productionHouseModel.deleteOne({_id: new mongodb.ObjectId(prodHouseId)})
};

module.exports =
    {removeProductionHouse, getProductionHouse, addProductionHouse, getAllProductionHouse};