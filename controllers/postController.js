const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const async = require('async');
const { body, validationResult} = require('express-validator');

exports.post_list = (req, res, next) => {
    Post.find({published: true})
    .populate('user')
    .sort({'timestamp': 'Ascending'})
    .exec((err, posts) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(posts)
    })
}

exports.post_detail = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: 'ObjectID not valid'});
    }
    async.parallel({
        post: (callback) => {
            Post.findOne({_id: req.params.id})
            .populate('user')
            .exec(callback);
        },
        post_comments: (callback) => {
            Comment.find({post: req.params.id})
            .populate('user')
            .exec(callback);
        }
    }, (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.post === null){
            return res.status(404).json({error: 'Post not found'});
        }
        res.status(200).json({post: results.post, comments: results.post_comments});
    });
}

exports.post_publish = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: 'ObjectID not valid'});
    }
    Post.findByIdAndUpdate({_id: req.params.id}, {published: true}, {useFindAndModify: false, new: true}).populate('user')
    .exec((err, post) => {
        if(err){
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(post);
    });
}


exports.post_unpublish = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: 'ObjectID not valid'});
    }
    Post.findByIdAndUpdate({_id: req.params.id}, {published: false}, {useFindAndModify: false, new: true}).populate('user')
    .exec((err, post) => {
        if(err){
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(post);
    });
}


exports.post_create = [
    body('title')
    .trim()
    .isLength({min:1}).withMessage('Title must not be empty.'),
    body('call')
    .trim()
    .isLength({min:1}).withMessage('Title must not be empty.'),
    body('cover')
    .trim()
    .isLength({min:1}).withMessage('Cover must not be empty'),
    body('content')
    .trim()
    .isLength({min:1}).withMessage('Content must not be empty.'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {title, call, cover, content} = req.body;
        Post.create({user: req.user._id, title, call, cover, content, published: false}, (err, post) =>{
            if(err){
                return res.status(400).json({error: err.message});
            }
            post.populate('user', (err, populatedPost) => {
                res.status(200).json(populatedPost);
            })
        })
    }
]

exports.post_update = [
    body('title')
    .trim()
    .isLength({min:1}).withMessage('Title must not be empty.'),
    body('call')
    .trim()
    .isLength({min:1}).withMessage('Title must not be empty.'),
    body('cover')
    .trim()
    .isLength({min:1}).withMessage('Cover must not be empty'),
    body('content')
    .trim()
    .isLength({min:1}).withMessage('Content must not be empty.'),
    
    (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({error: 'ObjectID not valid'});
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {title, call, cover, content} = req.body;
        Post.findByIdAndUpdate({_id: req.params.id}, {title, call, cover, content}, {useFindAndModify: false, new: true}, (err, updatedPost) => {
            if(err){
                return res.status(400).json({error: err.message});
            }
            updatedPost.populate('user', (err, populatedPost) => {
                if(err) {
                    return res.status(400).json({error: err.message});
                }
                res.status(200).json(populatedPost);
            });
        });
    }
];

exports.post_delete = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: 'ObjectID not valid'});
    }
    Post.findOneAndDelete({_id: req.params.id}, (err, deleted) => {
        if(err){
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(deleted);
    })
}