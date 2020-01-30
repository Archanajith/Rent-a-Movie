const firebaseConfig = {
    apiKey: "AIzaSyDB406O6lj0I3w7UC65uXgdhXcFjA9xgEI",
    authDomain: "movie-rents.firebaseapp.com",
    databaseURL: "https://movie-rents.firebaseio.com",
    projectId: "movie-rents",
    storageBucket: "movie-rents.appspot.com",
    messagingSenderId: "378600486599",
    appId: "1:378600486599:web:afb4cb30703e3c4c8530e2",
    measurementId: "G-K75N19L9L5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
firebase.analytics();

auth.onAuthStateChanged(user => {
    if (user) {
        //console.log(user);
    } else {
        console.log("User is not logged in");
    }
});

function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(
            provider)
        .then(function (result) {
            // console.log(result)
        }).catch(function (e) {
        // console.log(e);
        alert(error.message);
    })
}

function createUserWithEmail(regEmail, regPassword) {
    auth.createUserWithEmailAndPassword(regEmail, regPassword)
        .then(() => {
            console.log("Created User");
        }).catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function loginSpecificUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(console.log("Logged in"))
        .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
        });
}

function appLogout() {
    auth.signOut().then(() => console.log("Logged out"))
        .catch(function (error) {
            alert(error.message);
        });
}

function getCurrentUser() {
    return firebase.auth().currentUser;
}


