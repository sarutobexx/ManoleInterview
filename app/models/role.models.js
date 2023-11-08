const mongoose = require('mongoose');

const Role = mongose.model('Role');

new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Role;
