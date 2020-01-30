const db = require('./db');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const rolesModel = require('../models/roles.model.server');
const userModel = require('../models/user.model.server');
const movieRoles = require('../models/movieroles.model.server');
const movieModel = require('../models/movies.model.server');

getAllRoles = () => {
    rolesModel.find({}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    });
};

addRole = (roles) => {
    let roleIp = new rolesModel({
                                    role: roles.role
                                });
    return rolesModel.create(roleIp);
};

async function getUser(employeeKey) {
    let user = await userModel.findOne({'employee.employeeKey': employeeKey});
    return user;
}

async function getMovie(movieId) {
    let mov = await movieModel.findOne({_id: new mongodb.ObjectId(movieId)});
    return mov;
}

async function getRole(roleName) {
    let role = await rolesModel.findOne({role: roleName});
    return role;
}

async function addRoleToUser(roleMap) {
    let user = await getUser(roleMap.employeeKey);
    let movie = await getMovie(roleMap.movieId);
    let role = await getRole(roleMap.roleName);
    // console.log('user'+user._id);
    let dataToAdd =
        {
            movies: movie._id,
            roles: role._id,
            employee: user._id
        };
    let movRoles = new movieRoles(dataToAdd);
    return movieRoles.create(movRoles);
}

async function getUserFromEmail(userMail) {
    return userModel.findOne({email: userMail});
}

async function getUserRole(email) {
    let user = await getUserFromEmail(email);
    let roles = await movieRoles.findOne({employee: user._id});
    let role = await rolesModel.findOne({_id: roles._id});
    return role;
}

async function getAdminUserRole(email) {
    let user = await getUserFromEmail(email);
    let roles = await movieRoles.findOne({employee: user._id});
    let role = await rolesModel.findOne({_id: roles.roles});
    console.log('role- ' + role);
    if (role.role === 'admin') {
        return role;
    }
    throw new Error("Incorrect Role");

}

async function getManagerUserRole(email) {
    let user = await getUserFromEmail(email);
    console.log('user mail- ' + email);
    let roles = await movieRoles.findOne({employee: user._id});
    let role = await rolesModel.findOne({_id: roles.roles});
    console.log('role- ' + role);
    if (role.role === 'manager') {
        return role;
    }
    throw new Error("Incorrect Role");

}

async function getEmployeeUserRole(email) {
    let user = await getUserFromEmail(email);
    console.log('user mail- ' + email);
    let roles = await movieRoles.findOne({employee: user._id});
    let role = await rolesModel.findOne({_id: roles.roles});
    console.log('role- ' + role);
    if (role.role === 'employee') {
        return role;
    }
    throw new Error("Incorrect Role");
}

module.exports =
    {
        addRoleToUser,
        addRole,
        getAllRoles,
        getUserRole,
        getAdminUserRole,
        getManagerUserRole,
        getEmployeeUserRole
    };