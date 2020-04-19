const router = require('express').Router();
const { findUser, findAllUsers, createUser } = require('../controllers/users');

router.get('/users/:userId', findUser);
router.get('/users', findAllUsers);
router.post('/users', createUser);

module.exports = router;
