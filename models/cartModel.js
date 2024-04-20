const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/';

mongoose.connect(DB_URL);

const catSchema = mongoose.Schema({
    name: String,
    Price: Number,
    UserId: String,
    quantity: Number,
    ProductId: String,
    Timestamp: { type: Date, default: Date.now }
});

const catModel = mongoose.model('Cart', catSchema);

const AddNewToCart = (order) => {
    return new Promise((resolve, reject) => {
        // Check if quantity is a valid number
        if (isNaN(order.quantity) || order.quantity <= 0) {
            reject(new Error("Quantity must be a valid positive number."));
            return;
        }

        let newOrder = new catModel(order);
        catModel.findOne({ name: order.name, UserId: order.UserId })

            .then((existingOrder) => {
                if (existingOrder) {
                    existingOrder.quantity += newOrder.quantity;
                    return existingOrder.save();
                } else {
                    return newOrder.save();
                }
            })
            .then((savedOrder) => {
                resolve(savedOrder);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getCartByUserId = (userId) => {
    return catModel.find({ UserId: userId }).exec();
};

module.exports = { catModel, AddNewToCart, getCartByUserId };
