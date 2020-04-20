const router = require('express').Router();
const {
  findUser, findAllUsers, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', findUser);
router.get('/users', findAllUsers);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
