const Comment = require('../models/comment');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');

exports.create_comment = [
    body('content')
    .trim()
    .isLength({min:1}).withMessage('Content must be not empty'),

    (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.post_id)){
            return res.status(400).json({error: 'ObjectID not valid.'});
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {content} = req.body;
        Comment.create({user: req.user._id, post: req.params.post_id, content}, (err, comment) => {
            if(err){
                return res.status(400).json({error: err.message});
            }
            comment.populate('user').populate('post', (err, populated) => {
                res.status(200).json(populated);
            })
        });        
    }
];

exports.comment_update = [
    body('content')
    .trim()
    .isLength({min:1}).withMessage('Content must be not empty'),

    (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.comment_id)){
            return res.status(400).json({error: 'ObjectID not valid.'});
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {content}  = req.body
        Comment.findOneAndUpdate({_id: req.params.comment_id}, {content}, {new: true, useFindAndModify: false}).populate('user').exec((err, comment) => {
            if(err){
                return res.status(400).json({error: err.message});
            }
            res.status(200).json(comment);
        })
    }
]


exports.comment_delete = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.comment_id)){
        return res.status(400).json({error: 'ObjectID not valid.'});
    }
    Comment.findOneAndDelete({_id: req.params.comment_id}, (err, deleted) => {
        if(err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(deleted);
    })
}