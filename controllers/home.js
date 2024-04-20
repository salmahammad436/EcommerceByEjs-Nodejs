const {ProductModel, getAllPeoducts ,getProductsByCategory} = require("../models/productModel");
const { login } = require("../controllers/signup");
getHome=(req,res,next)=>{
     
     //if category==null or all
     let category=req.query.category;
     let validCategory=["shirts","T-shirts"];
     if(category && validCategory.includes(category))
     {
      getProductsByCategory(category).then(Products=>{
         res.render('index',{Products:Products});
    })
     }else{
//get products from database
     getAllPeoducts().then(Products=>{
     res.render('index',{Products:Products
     });
})
     }
}

module.exports={getHome};