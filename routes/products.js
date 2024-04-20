const {getProducts}=require('../controllers/products');

const router=require('express').Router();


router.get('/:id',getProducts);

module.exports=router;