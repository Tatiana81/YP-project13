const User = require('../models/user');

const findUser = (req, res) => {
  console.log('Im here');
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.status(200).send({ data: user });
      else {
        res.status(404).send({
          message: 'Нет пользователя с таким id',
        });
      }
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const findAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name, about: req.body.about, avatar: req.body.avatar,
  })
    .then((user) => (res.send({ data: user })))
    .catch((err) => { res.status(500).send({ message: `Произошла ошибка ${err}` }); });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar,
  })
    .then((user) => (res.send({ data: user })))
    .catch((err) => { res.status(500).send({ message: `Произошла ошибка ${err}` }); });
};

module.exports = {
  findUser, findAllUsers, createUser, updateUser, updateAvatar,
};
