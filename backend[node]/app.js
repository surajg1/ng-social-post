const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts')

const app = express();



mongoose.connect('mongodb+srv://surajgholap:srj@9604@cluster0-kmd7r.mongodb.net/posts?retryWrites=true&w=majority', {useNewUrlParser: true})
            .then(()=>{
                console.log("DataBase connectd");
            }).catch(()=>{
                console.log("Connection Fails");
            });

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended : false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
}); 
// var posts;
 
app.use("/api/posts",postsRoutes);
module.exports = app;
