const router = require('express').Router();
const { postCart, gatCart,deleteProduct } = require('../controllers/cart');
const { auth } = require('./gaurds/auth.gaurd'); // Corrected spelling of "guard"
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.get('/', auth, cookieParser(), gatCart); 
router.post('/', auth, bodyParser.urlencoded({ extended: true }), postCart);
router.post('/cancel',bodyParser.urlencoded({ extended: true }),deleteProduct)

module.exports = router;
