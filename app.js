const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const Homerouter=require('./routes/home');
const Productrouter=require('./routes/products');
const SignUprouter=require('./routes/signup');
const { error, log } = require('console');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cartRouter=require('./routes/cart');



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');
app.set('views','views');
app.use(cookieParser());


app.listen(4000,(()=>{
   
    console.log("server is running on port 4000");
}));

app.use('/',Homerouter);
app.use('/product',Productrouter);
app.use('/',SignUprouter);
app.use('/cart',cartRouter);

