const mongodb = require('mongodb');
const userModel = require('../models/user.model.server');
const phoneModel = require('../models/phone.model.server');
const addressModel = require('../models/address.model.server');

/* Get all the users*/
getAllUsers = () => {
    return userModel.find({});
};

async function updateUser(userJson) {
    console.log(userJson);
    let updatedModel = await userModel.update({"email": userJson.regEmail},
                                              {
                                                  $set: {
                                                      "firstname": userJson.firstName,
                                                      "lastname": userJson.lastName
                                                  }
                                              });
    return updatedModel;
}

async function insertPhone(phoneNum) {
    let phone1 = new phoneModel({
                                    phone: phoneNum
                                });
    let ph = await phoneModel.create(phone1);
    return ph;
}

async function insertAddress(address1street1, address1street2,
                             state, zip, city) {
    let address = new addressModel({
                                       Street1: address1street1,
                                       Street2: address1street1,
                                       City: city,
                                       State: state,
                                       Zip: zip
                                   });
    let addressIP = await addressModel.create(address);
    return addressIP;
}

//Add Customer
async function insertCustomer(data) {
    let firstName = data.firstName;
    let lastName = data.lastName;
    let dob = data.dob;
    let passwordRegUser = data.regPassword;
    let address1street1 = data.address1street1;
    let address1street2 = data.address1street1;
    let address1city = data.address1city;
    let address1state = data.address1state;
    let phone1basic = data.phone1basic;
    let phone1primary = data.phone1primary;
    let regEmail = data.regEmail;
    let zip = data.zip;
    let phone1 = await insertPhone(phone1basic);
    let phone2 = await insertPhone(phone1primary);
    let address1 = await insertAddress(address1street1, address1street2, address1state, zip,
                                       address1city);

    let customer = new userModel({
                                     firstname: firstName,
                                     lastname: lastName,
                                     password: passwordRegUser,
                                     email: regEmail,
                                     dateofbirth: dob,
                                     'customer.availableBalance': 100
                                 });
    customer.address = address1._id;
    customer.phone = phone1._id;
    customer.phone_Primary = phone2._id;
    let user = await userModel.create(customer);
    return user;
}

async function addEmployee(firstName, lastName, dob, passwordRegUser, street1,
                           street2,
                           state, regEmail, address1city, phone, phonePrimary, empkey,
                           startdate,
                           manager, zip) {

    let phone1 = await insertPhone(phone);
    let phone2 = await insertPhone(phonePrimary);
    let address1 = await insertAddress(street1, street2, state, zip, address1city);
    if (manager) {
        let managerInfo = await userModel.find({"email": manager});
        let managers = [];
        managers.push(managerInfo);
        console.log('Managers -' + managers);
        let employee = new userModel({
                                         firstname: firstName,
                                         lastname: lastName,
                                         password: passwordRegUser,
                                         email: regEmail,
                                         dateofbirth: dob,
                                         address: address1._id,
                                         phone: phone1,
                                         phone_Primary: phone2,
                                         employee: {
                                             employeeKey: empkey,
                                             startDate: startdate,
                                             manager: managers
                                         }
                                     });
        console.log('Employee - ' + employee);
        return userModel.create(employee);
    } else {
        let employee = new userModel({
                                         firstname: firstName,
                                         lastname: lastName,
                                         password: passwordRegUser,
                                         email: regEmail,
                                         dateofbirth: dob,
                                         address: address1._id,
                                         phone: phone1._id,
                                         phone_Primary: phone2._id,
                                         employee: {
                                             employeeKey: empkey,
                                             startDate: startdate
                                         }
                                     });
        console.log('Employee - ' + employee);
        return userModel.create(employee);
    }
}

removeEmployee = (empEmail) => {
    return userModel.deleteOne({"email": empEmail});
};

removeCustomer = (customerId) => {
    return userModel.deleteOne({"email": customerId});
};

getCustomerByEmail = (userEmail) => {
    userModel.findOne({email: userEmail}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    })
};

async function getEmployeesForManager(managermail) {
    console.log(managermail);
    let managerInfo = await userModel.findOne({"email": managermail});
    console.log("manager id-*****: " + managerInfo._id);

    //let users = userModel.find({'employee.manager[0].[0]._id': managerInfo._id});
    let users = userModel.find({'employee.manager[0]._id': managerInfo._id});
    return users;
}

module.exports =
    {
        getAllUsers,
        insertCustomer,
        addEmployee,
        removeCustomer,
        removeEmployee,
        getCustomerByEmail,
        updateUser,
        getEmployeesForManager
    };
