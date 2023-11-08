const jwt = require('jwtwebtoken');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

verifyTk = (req, res, next) => {
  let token = req.headers['X-acess-token'];

  if (!token) {
    return res.status(401).send({ message: 'Invalid token' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'In token' });
    }
    req.userId = decoded.id;
    next();
  });
};

ifAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: 'err' });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: 'err' });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Access denied' });
      }
    );
  });
};

ifModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: 'err' });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: 'err' });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Access denied' });
        return;
      }
    );
  });
};

const authenticate = {
  verifyTk,
  ifAdmin,
  ifModerator,
};

module.exports = authenticate;
