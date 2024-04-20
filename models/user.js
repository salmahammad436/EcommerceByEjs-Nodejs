const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_URL = 'mongodb://localhost:27017/';
const cookieParser = require('cookie-parser');
const { resolveInclude } = require('ejs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    minlength:3
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:100,
    
  },role:{
    type:String,enum:['user','admin'],default:'user'},
});

const UserModel = mongoose.model('User', UserSchema);

const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL)
      .then(() => {
        return UserModel.findOne({ email: email });
      })
      .then(user => {
        if (user) {
          reject(new Error('User already exists.'));
        } else {
          return bcrypt.hash(password, 10)
            .then(hashedPassword => {
              let newUser = new UserModel({
                name: name,
                email: email,
                password: hashedPassword,
              });
              return newUser.save();
            })
            .then(() => {
              mongoose.disconnect();
              resolve();
            })
            .catch(error => {
              mongoose.disconnect();
              reject(error);
            });
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
};

const login = (email, password, res) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL)
      .then(() => {
        return UserModel.findOne({ email: email });
      })
      .then(user => {
        if (!user) {
          reject(new Error('User does not exist.'));
        } else {
          return bcrypt.compare(password, user.password)
            .then(verifyPassword => {
              if (!verifyPassword) {
                mongoose.disconnect();
                reject(new Error('Invalid password.'));
              } else {
                mongoose.disconnect();
                let token = jwt.sign({ email:user.email, password: user.password,userId:user._id ,role:user.role},'hakonamatata', { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                resolve(token);
              }
            });
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
};




module.exports = { UserModel, createUser, login };