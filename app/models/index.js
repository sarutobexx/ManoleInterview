const mongoose = require('mongoose');

mongoose.promisse = global.promisse;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.models');
db.roles = require('./role.models');

db.ROLES = ['admin', 'user', 'moderator'];

e.exports = db;
