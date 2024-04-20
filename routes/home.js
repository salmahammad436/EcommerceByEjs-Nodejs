const { getHome } = require("../controllers/home");

const router=require('express').Router();
const{auth}=require('../routes/gaurds/auth.gaurd');

router.get('/',auth,getHome);

module.exports=router;