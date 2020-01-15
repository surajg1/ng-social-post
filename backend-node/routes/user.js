const express = require("express");
const router = express.Router();
const User = require("../routes/user");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next)=> {

    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                email : req.body.email,
                password: hash
            })
            User.save().then(result =>{
                res.stats(201).json({
                    message: 'User Created',
                    result: result
                });
            }).catch(error =>{
              res.status(500).json({
                  error : error
              })

              })
        })


});

module.exports = router;