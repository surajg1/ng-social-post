const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Image Type!");
        if(isValid){
            error = null;
        }
        cb(error, "backend-node/images");
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

router.post("", checkAuth,multer({storage : storage}).single("image"),(req,res,next)=>{
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title : req.body.title,
        content : req.body.content,
        imagePath : url + "/images/" + req.file.filename,
        creator : req.userData.userId
        });
    post.save().then(CreatedPost => {
        res.status(201).json({
            message : 'Post added successfully!',
            postId: {
                ...CreatedPost,
                id : CreatedPost._id
            }
        })    
    }).catch(error => {
        res.status(500).json({
            message : "Post creation Faild!"
        })
    });
    // posts.push(post.value);
    console.log(post);
   
});

router.put("/:id",checkAuth, multer({storage : storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title : req.body.title,
        content : req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    console.log(post);
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
       if(result.nModified > 0){
           res.status(200).json({message: "Updated Suceesfully"});  
       }else{
           res.status(401).json({ message:" You Does not create those post" })
       }
    }).catch(error =>{
        res.status(500).json({
            message : "Fails to Update a Post!!"
        })
    })
})

router.get('',(req,res,next)=>{
    
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;

    if(pageSize && currentPage){

        postQuery.skip(pageSize * (currentPage - 1))
                    .limit(pageSize);

    }

    postQuery.then(documents=>{
        fetchedPosts = documents;
        return Post.count();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched sucessfully!",
            posts: fetchedPosts,
            maxPosts:count
        });
    })
    .catch(error => {
        res.status(500).json({
            message : "Fails to Getting your a Post!!"
        })
    });
});

router.get("/:id",(req,res,next)=>{
        Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message : "Request does not found"});
        }

    }).catch(error => {
        res.status(500).json({
            message : "Fails to Getting your a Post!!"
        })
    });
});

router.delete("/:id",checkAuth,(req,res,next) => {
    console.log(req.params.id);
    Post.deleteOne({_id : req.params.id, creator: req.userData.userId}).then(result => {
        if(result.n > 0){
            res.status(200).json({message: "Deleted Suceesfully"});  
        }else{
            res.status(401).json({ message:" You Does not create those post" })
        }    }) .catch(error => {
            res.status(500).json({
                message : "Fails to Deleting your a Post!!"
            })
        });
});

module.exports = router;
