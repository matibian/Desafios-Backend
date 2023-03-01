"use strict";

var mongoose = require("mongoose");

var findOrCreate = require('mongoose-findorcreate');

var UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    max: 100
  },
  name: {
    type: String,
    required: true,
    max: 30
  },
  dir: {
    type: String,
    required: true,
    max: 50
  },
  age: {
    type: Number,
    required: true,
    max: 30
  },
  phone: {
    type: Number,
    required: true,
    max: 30
  },
  avatar: {
    type: String,
    required: true,
    max: 100
  }
});
UsuarioSchema.plugin(findOrCreate);
var Usuarios = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuarios;