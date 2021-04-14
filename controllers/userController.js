require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');


exports.user_list = (req, res, next) => {
    User.find()
    .sort({'timestamp': 'Ascending'})
    .exec((err, users) => {
        if(err){
            return res.status(404).json({error: err});
        }
        res.status(200).json(users);
    })
}

exports.user_detail = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: 'ObjectID not valid'});
    }
    User.findOne({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(400).json(err);
        }
        res.status(200).json(user);
    })
}

exports.sign_up = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec((err, user_found) => {
        if(err){
            return res.status(400).json({error: err.message});
        }
        if(user_found){
            return res.status(400).json({error: 'User already registered'});
        }
        bcrypt.hash(req.body.password, 10, (err, newPass) => {
            if(err){
                return res.status(400).json({error: err.message});
            }
            User.create({isAdmin: false,username: req.body.username, email: req.body.email, password: newPass}, (err, user) => {
                if(err){
                    return res.status(500).json({error: err.message});
                }
                jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET,{expiresIn: 86400}, (err, token) => {
                    if(err){
                        return res.status(500).json({error: err.message});
                    }
                    res.status(200).json({
                        token: token,
                        user: {_id: user._id, email: user.email}, 
                        message:'Signed up Successfully', 
                      });
                });
            });
        });
    });
}

exports.log_in = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => { 
        if(err || !user) {
          return res.status(400).json({
            message: 'Could not authenticate',
            user: user
          })
        }
        if(err) res.send(err);
        jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 86400} , (err, token) => {
          if(err) return res.status(400).json(err);
          res.json({token: token, user: {_id: user._id, email: user.email}});
        });
      })(req, res);
}