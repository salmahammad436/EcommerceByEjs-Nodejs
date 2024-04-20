const DB_URL = 'mongodb://localhost:27017/';

const mongoose=require('mongoose');

const productSchemaa = mongoose.Schema({
    name: String,
    Price: Number,
    description: String,
    Image: String,
    category: String
  });

const ProductModel=mongoose.model('Product',productSchemaa);
const getAllPeoducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return ProductModel.find({});
            })
            .then((Products) => {
                mongoose.disconnect();
                resolve(Products);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return ProductModel.find({ category: category });
            })
            .then((Products) => {
                mongoose.disconnect();
                resolve(Products);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getProductById=(id)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return ProductModel.findById(id);
        }).then(product=>{
            mongoose.disconnect();
            resolve(product)
        }).catch((err)=>{
            reject(err);
        })
    })
}








 module.exports = { ProductModel, getAllPeoducts,getProductsByCategory,getProductById };