const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_KEY } = require('../const');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email }).exec().then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Email already exists"
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Err in bcrypt: "+err
          })
        } else {
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            department: req.body.department
          })
          user.save().then(result => {
            return res.status(201).json({
              message: 'User created'
            })
          }).catch(err => {
            return res.status(500).json({
              message: 'Failed to create user: '+err
            })
          })
        }
      })
    }
  }).catch(err => {
    return res.status(200).json({
      message: err
    })
  })
}

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email }).exec().then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            JWT_KEY,
            {
              expiresIn: "24h"
            }
          );

          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        } else {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
      })
    }
  }).catch(err => {
    return res.status(500).json({
      message: 'failed to execute: '+err
    })
  })
}