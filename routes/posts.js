const express = require('express');
const router = express.Router();
const passport = require('passport');

const PostController = require('../controllers/postController');

router.get('/', PostController.post_list);

router.get('/:id', PostController.post_detail);

router.post('/:id/publish', [
    passport.authenticate('jwt', {session: false}),
    PostController.post_publish
]);


router.post('/:id/unpublish', [
    passport.authenticate('jwt', {session: false}),
    PostController.post_unpublish
]);


router.post('/create', [
    passport.authenticate('jwt', {session: false}),
    PostController.post_create
]);


router.put('/:id/update', [
    passport.authenticate('jwt', {session: false}),
    PostController.post_update
])

router.delete('/:id/delete', [
    passport.authenticate('jwt', {session: false}),
    PostController.post_delete
])

module.exports = router;