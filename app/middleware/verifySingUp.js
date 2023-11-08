const db = require('../models');
const ROLES = db.ROLES;
const User = db.User;

checkDuplicateUser = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: 'Duplicate user' });
      return;
    }
    if (user) {
      res.status(400).send({ message: 'Duplicate user' });
      return;
    }

    //email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: 'Duplicate user' });
        return;
      }
      if (user) {
        res.status(400).send({ message: 'Duplicate user' });
        return;
      }
    });

    next();
  });
};

checkRoleExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: 'Invalid role' });
        return;
      }
    }
  }
  next();
};
const verifySingUp = {
  checkDuplicateUser,
  checkRoleExist,
};

module.exports = verifySingUp;
