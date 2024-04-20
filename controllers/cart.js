const mongoose = require('mongoose');
const { catModel, AddNewToCart, getCartByUserId } = require('../models/cartModel');
const jwt = require('jsonwebtoken');

// MongoDB connection URL
const DB_URL = 'mongodb://localhost:27017/';

// Establish MongoDB connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other operations here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define postCart controller function
const postCart = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }

        const decodedToken = jwt.verify(token, 'hakonamatata');
        const userId = decodedToken.userId;
        if (!userId) {
            return res.redirect('/login');
        }

        // Add item to cart
        await AddNewToCart({
            name: req.body.name,
            Price: req.body.Price,
            quantity: req.body.quantity,
            UserId: userId,
            ProductId: req.body.ProductId,
            Timestamp: Date.now()
        });

        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to cart.');
    }
};

// Define gatCart controller function
const gatCart = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).redirect('/login');
        } else {
            const decodedToken = jwt.verify(token, 'hakonamatata');
            const userId = decodedToken.userId;

            getCartByUserId(userId).then((items) => {
                res.render('cart', { items: items, isUser: true });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items.');
    }
};

// Define deleteProduct controller function
const deleteProduct = async (req, res) => {
    const CartId = req.body.CartId;

    try {
        const deletedCart = await catModel.findByIdAndDelete(CartId);
        if (!deletedCart) {
            return res.status(404).send('Cart item not found');
        }

        res.status(200).redirect('/cart');
    } catch (error) {
        console.error('Error canceling cart item:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Export the controller functions
module.exports = { postCart, gatCart, deleteProduct };
