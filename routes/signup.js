const router = require('express').Router();
const bodyParser = require('body-parser');
const {getSignUp,postSignUp,getSignin,postloin,logOut}=require('../controllers/signup');
const cookieParser = require('cookie-parser');
const {check}=require('express-validator');




router.get('/signup',getSignUp);
router.post('/signup',bodyParser.urlencoded({extended:true}),check('email').not().isEmpty().withMessage('Email is required'),check('Confirmpassword').custom((value,{req})=>{
    if(value==req.body.password) return true
    else throw 'invalid confirmPassword'

}),postSignUp);
router.get('/login',getSignin);
router.post('/login',postloin);
router.all('/logout',logOut);

module.exports=router;