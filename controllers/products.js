const{getProductById}=require('../models/productModel');

 const getProducts=(req,res)=>{
    let productId=req.params.id;
    getProductById(productId).then(product=>{
        res.render('products',{product:product});
    })
 }

 module.exports={getProducts};