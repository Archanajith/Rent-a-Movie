const expressJs = require('express');
const application = expressJs();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dao_coupon = require('./dao/coupon.dao.server');
const dao_movie = require('./dao/movie.dao.server');
const dao_employee = require('./dao/users.dao.server');
const dao_order = require('./dao/orders.dao.server');
const dao_role = require('./dao/role.dao.server');
const dao_production_house = require('./dao/productionhouse.dao.server');
const dao_genre = require('./dao/genre.dao.server');
const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/movie-rental");
// mongoose.Promise = global.promise;
application.use(bodyparser.json());
application.use(bodyparser.urlencoded({extended: true}));

application.use(cors());
application.options("*", cors())

application.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});
//
// application.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:63342/"); // update to match the
// domain you will make the request from res.header("Access-Control-Allow-Headers", "Origin,
// X-Requested-With, Content-Type, Accept"); next(); });

/** To get all movies */
application.get('/api/getMovies', (req, res) => {

    dao_movie.getAllMovies().then((r) => {
        res.json(r);
    })
    //res.sendFile(__dirname + '/AddMovie1.html');
});

/**To add Role Only*/
application.post('/api/postInsertRole', (req, res) => {
    const roleName = req.body.roleName;
    var data = {
        "role": roleName

    }
    dao_role.addRole(data).then((r) => {
        console.log(r)
        res.json(r)
    })

});

/**To add Role To Employee with movie id */
application.post('/api/postInsertRoleEmployeeMovie', (req, res) => {
    const roleName = req.body.roleName;
    const employeeKey = req.body.employeeKey;
    const movieId = req.body.movieId;
    var data = {
        "roleName": roleName,
        "employeeKey": employeeKey,
        "movieId": movieId
    };
    dao_role.addRoleToUser(data).then((r) => {
        res.json(r);
    })

});

/**To add new Production House*/
application.post('/api/postProductionHouse', (req, res) => {
    const name = req.body.name;
    const established = req.body.established;
    console.log(name);
    console.log(established);
    var data = {
        "name": name,
        "established": established

    }

    dao_production_house.addProductionHouse(data).then((r) => {
        console.log(r);
        res.json(r);
    })

});

/** To get all movies by title*/
application.post('/api/getMoviesBytitle', (req, res) => {

    dao_movie.getMoviesByTitle(req.body.title).then((r) => {
        res.json(r);
    })
    //res.sendFile(__dirname + '/AddMovie1.html');
});

/** To get all movies by id */
application.post('/api/getMoviesById', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    console.log(id);
    dao_movie.getMoviesbyId(id).then((r) => {
        console.log(r);
        res.json(r);
    })
    //res.sendFile(__dirname + '/AddMovie1.html');
});

/*Too add a New Movie */
application.post('/api/postMovieData', (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    let actors = req.body.actors;
    let director = req.body.director;
    let year = req.body.year;
    let rating = req.body.rating;
    let production_house = req.body.production_house;
    let genre = req.body.genre;
    let genre2 = req.body.genre2;

    dao_movie.addMovie(name, description, actors, director, year, rating, production_house, genre,
                       genre2)
        .then((r) => {
            res.json(r);
        });
});

/** To remove a movie */
application.post('/api/deleteMovie', (req, res) => {

    var id = req.body.id;
    dao_movie.removeMovie(id).then((r) => {
        res.json(r);
    })
    //res.sendFile(__dirname + '/AddMovie1.html');
});

/*Too add a New Coupon */
application.post('/api/postCoupon', (req, res) => {
    var name = req.body.name;
    var discount = req.body.discount;

    dao_coupon.addCoupon(name, discount).then((re) => {
        console.log(re);
        res.json(re);
    })
});

/*Too add a Remove Coupon */
application.post('/api/removeCoupon', (req, res) => {
    var name = req.body.name;

    dao_coupon.addCoupon(name).then((re) => {
        console.log(re);
        res.json(re);
    })
});

/** To get all Coupon  */
application.get('/api/getAllCoupon', (req, res) => {
    dao_coupon.getAllCoupons().then((r) => {
        res.json(r);
    })
});

/** To get Coupon Page */
application.get('/api/getCoupon', (req, res) => {
    res.sendFile(__dirname + '/AddCoupon.html');
});

/** To get Employeye Page */
application.get('/api/getEmployeePage', (req, res) => {
    res.sendFile(__dirname + '/AddEmployee.html');
});

/** To get all Employeye  */
application.get('/api/getEmployee', (req, res) => {
    dao_employee.getAllUsers().then((r) => {
        res.json(r)
    })
});

/**To remove an employee */
application.post('/api/deleteEmployee', (req, res) => {
    const empkey = req.body.regemail;
    dao_employee.removeEmployee(empkey).then((r) => {
        res.json(r)
    })
});

/**To remove customer */
application.post('/api/deleteCustomer', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    dao_employee.removeCustomer(firstName, lastName).then((r) => {
        res.json(r)
    })
});

/*Too add a New Employee */
application.post('/api/postEmployee', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const passwordRegUser = req.body.passwordRegUser;
    const address1street1 = req.body.address1street1;
    const address1street2 = req.body.address1street1;
    const address1city = req.body.address1city;
    const address1state = req.body.address1state;
    const phone1basic = req.body.phone1basic;
    const phone1primary = req.body.phone1primary;
    const empkey = req.body.empkey;
    const startdate = req.body.startdate;
    const regEmail = req.body.regEmail;
    const manager = req.body.manager;
    const zip = req.body.zip
    dao_employee.addEmployee(firstName, lastName, dob, passwordRegUser, address1street1,
                             address1street2,
                             address1state, regEmail, address1city, phone1basic, phone1primary,
                             empkey, startdate, manager, zip).then((r) => {
        console.log(r)
        res.json(r)
    })
});

/*Too add a Update Employee */
application.post('/api/updateUser', (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const regEmail = req.body.regemail;

    console.log('dirst- '+firstName);
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "regEmail": regEmail
    };

    console.log('data-' + data.firstName);
    dao_employee.updateUser(data).then((r) => {
        console.log(r);
        res.json(r);
    })
});

/*Too add a New Cutomer */
application.post('/api/postCustomer', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const passwordRegUser = req.body.regPassword;
    const address1street1 = req.body.address1street1;
    const address1street2 = req.body.address1street1;
    const address1city = req.body.address1city;
    const address1state = req.body.address1state;
    const phone1basic = req.body.phone1basic;
    const phone1primary = req.body.phone1primary;
    const regEmail = req.body.regEmail;
    const zip = req.body.zip;

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "dob": dob,
        "passwordRegUser": passwordRegUser,
        "address1street1": address1street1,
        "address1street2": address1street2,
        "address1city": address1city,
        "address1state": address1state,
        "phone1basic": phone1basic,
        "phone1primary": phone1primary,
        "regEmail": regEmail,
        "zip": zip
    };

    dao_employee.insertCustomer(data).then((r) => {
        console.log(r);
        res.json(r)
    })
});


/*Too post Customer's order */
application.post('/api/postCustomerOdrer', (req, res) => {

    const coupon = req.body.couponAmount;
    const movie_id = req.body.movieRef;
    const amount = req.body.amount;
    const user_id = req.body.email;

    var data = {
        "movie_id": movie_id,
        "user_id": user_id,
        "coupon": coupon,
        "amount": amount
    };

    dao_order.createOrder(data).then((r) => {
        res.json(r);
    })

});

/** API for Genre */
/*Too post genre' */
application.post('/api/postInsertGenre', (req, res) => {

    var name = req.body.genrename;
    dao_genre.addGenre(name).then((r) => {
        //console.log(r);
        res.json(r);
    });

});

/* Too get all genre*/
application.get('/api/getAllGenre', (req, res) => {
    var r = dao_genre.getAllGenres().then((r) => {
        console.log(r)
    });

});

/** To get all movies */
application.post('/api/getSearchedMovies', (req, res) => {

    var name = req.body.name;
    dao_movie.getMoviesBySearchKey(name).then((r) => {
        // console.log(r)
        res.json(r);
    })
});

/** Too get User Role **/
application.post('/api/getUserRole', (req, res) => {
    let email = req.body.email;
    console.log(email);
    var r = dao_role.getUserRole(email).then((r) => {
        console.log(r);
        return res.json(r);
    });
});

/** Too get User Role **/
application.post('/api/getAdminUserRole', (req, res) => {
    let email = req.body.email;
    console.log(email);
    var r = dao_role.getAdminUserRole(email).then((r) => {
        console.log('Insied next- ' + r);
        return res.json(r);
    }).catch((err) => {
        console.log('Inside err - ' + err);
        return res.status(500).json({success: false, err});

        //next(err);
    });
});

/** Too get User Role **/
application.post('/api/getManagerUserRole', (req, res) => {
    let email = req.body.email;
    console.log(email);
    var r = dao_role.getManagerUserRole(email).then((r) => {
        console.log('Insied next- ' + r);
        return res.json(r);
    }).catch((err) => {
        console.log('Inside err - ' + err);
        return res.status(500).json({success: false, err});

        //next(err);
    });
});

/** Too get User Role **/
application.post('/api/getEmployeeUserRole', (req, res) => {
    let email = req.body.email;
    console.log(email);
    var r = dao_role.getEmployeeUserRole(email).then((r) => {
        return res.json(r);
    }).catch((err) => {
        return res.status(500).json({success: false, err});

        //next(err);
    });
});

/*Too update a New Movie */
application.post('/api/updateMovieData', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    let actors = req.body.actors;
    console.log('id' + id);
    console.log('name' + name);
    console.log('actors: ' + actors);

    dao_movie.updateMovie(id, name, actors).then((r) => {
        res.json(r);
    });
});

/** Get All the Order for a customer **/
application.post('/api/getAllOrdersForCustomer', (req, res) => {
    var id = req.body.id;
    dao_order.getOrdersForCustomer(id).then((re) => {
        console.log(re);
        return res.json(re);
    });
});

/**Get All the Order for a customer**/
application.post('/api/getMovieByProductionHouse', (req, res) => {
    let name = req.body.name;
    dao_movie.getMoviesByProductionHouse(name).then((re) => {
        console.log(re);
        return res.json(re);
    });
});

/** Get employee of manager **/
application.post('/api/getEmployeeForManager', (req, res) =>{
    var email = req.body.email;
    console.log('User Mail: ' + email);
    dao_employee.getEmployeesForManager(email).then((re)=>{
        console.log(re);
        return res.json(re);
    });
});

//application.use('/', router);
const port = process.env.port || 3002;
application.listen(port);
