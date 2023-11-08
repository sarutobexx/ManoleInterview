const { verifySingUp } = require('../middleware/verifySingUp');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/singup',
    [verifySingUp.checkDuplicateUser, verifySingUp.checkRoleExist],
    controller.singup
  );

  app.post('/api/auth/signin', controller.signin);
};
