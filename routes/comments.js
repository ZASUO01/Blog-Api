const express = require('express');
const router = express.Router();
const passport = require('passport');


const CommentController = require('../controllers/commentController');

router.post('/:post_id/create',  [
    passport.authenticate('jwt', {session: false}),
    CommentController.create_comment
]);

router.put('/:comment_id/update', [
    passport.authenticate('jwt', {session: false}),
    CommentController.comment_update
])

router.delete('/:comment_id/delete', [
    passport.authenticate('jwt', {session: false}),
    CommentController.comment_delete
])

module.exports = router;