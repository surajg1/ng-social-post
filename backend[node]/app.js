const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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
        "GET, POST, PATCH, DELETE, OPTIONS"
        );
    next();
}); 
// var posts;
 
app.post("/api/posts", (req,res,next)=>{
    const post = req.body;
    // posts.push(post.value);
    console.log(post);
    res.status(201).json({
        message : 'Post added successfully!'
    })
})

app.get('/api/posts',(req,res,next)=>{

  const posts = [
        { 
            id:"00001",
            title:"First server-side post",
            content:"Firse server side content response"
         },
         { 
            id:"00002",
            title:"Second server-side post",
            content:"Second server side content response"
         }
    ];


    res.status(200).json({
        message : 'posts fetch successfully!',
        posts : posts
    });
    // next(); 
});

module.exports = app;
