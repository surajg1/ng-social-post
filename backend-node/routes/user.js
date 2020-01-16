const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next)=> {

    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                email : req.body.email,
                password: hash
            })
            user.save().then(result =>{
                res.stats(201).json({
                    message: 'User Created',
                    result: result
                });
            }).catch(error =>{
              res.status(500).json({
                  error : error
              })
              console.log(error);

              })
        })


});

router.post("/login", (req, res, next)=> {

    let fatechdUser;

    User.findOne({email: req.body.email}).then(user => {
        if(!user){
            // console.log(user);
            return res.status(401).json({
                message : "authentication falid"
            });
        }
        fatechdUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result =>{
        if(!result){
            return res.status(401).json({
                message : "authentication falid"
            });
        }

        console.log(fatechdUser);

        const token = jwt.sign({email: fatechdUser.email, userId: fatechdUser._id},
            'secret_this_should_be_longer', 
            {expiresIn: '1h'}
            );
            res.status(200).json({
                token: token
            });    
            
        }).catch(err => {
            console.log(err);
        return res.status(401).json({
            message : "authentication falid"
        });
    })
});

module.exports = router;