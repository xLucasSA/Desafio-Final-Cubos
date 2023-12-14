const express = require('express');
const usuarios = express()

const { detalharPerfil } = require("../controladores/usuarios/detalharPerfil");
const { editarUsuarioLogado } = require("../controladores/usuarios/usuarios");

const validarCampos = require("../intermediarios/validarCampos");
const schemaCadastro = require("../schema/cadastroUsuario");

usuarios.get("/usuario", detalharPerfil);
usuarios.put("/usuario", validarCampos(schemaCadastro), editarUsuarioLogado);

module.exports = usuarios