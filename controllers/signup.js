const { UserModel, createUser,login } = require('../models/user');
const cookieParser = require('cookie-parser');
const {validationResult} = require('express-validator');

const getSignUp = (req, res, next) => {
    res.render('signup');
}

const postSignUp = (req, res, next) => {
    console.log(validationResult(req).array());
    if(validationResult(req).isEmpty()){
        
    
    const { name, email, password } = req.body;
    createUser(name, email, password)
        .then(() => {
            res.redirect('/login'); 
        })
        .catch((error) => {
            console.error('Error during signup:', error);
            res.render('signup', { error: 'An error occurred. Please try again.' }); // Send error message to signup page
        });
}
else{
    res.redirect('/signup');
    req.flash('validationerror',validationResult(req).array());
}}

const getSignin = (req, res, next) => {
    res.render('login');
}

const postloin=(req, res, next) => {
    const { email, password } = req.body;
    login(email,password,res).then((token)=>{
        res.redirect('/');
    }).catch(err=>{
        console.log(err);
        res.status(400).send(err.message);
        res.redirect('/login');
    })

}

const logOut=(req, res, next) => {
res.clearCookie('token');
res.redirect('/login');

}

module.exports = { getSignUp, postSignUp, getSignin ,postloin,logOut};
