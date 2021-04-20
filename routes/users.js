const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/userController');

router.get('/', UserController.user_list);
router.get('/:id', UserController.user_detail);
router.post('/sign-up', UserController.sign_up);
router.post('/log-in', UserController.log_in);
router.delete('/:id/delete', [
    passport.authenticate('jwt', {session: false}),
    UserController.user_delete
]);

module.exports = router;