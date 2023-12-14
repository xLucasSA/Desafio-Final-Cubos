const express = require('express');
const rotasAbertas = express()

const listarCategorias = require("../controladores/produtos/categorias");
const { cadastrarUsuario } = require("../controladores/usuarios/cadastrarUsuario");
const { logarUsuario } = require("../controladores/usuarios/login");

const validarCampos = require("../intermediarios/validarCampos");
const schemaCadastro = require("../schema/cadastroUsuario");
const schemaLogin = require("../schema/logarUsuario");

rotasAbertas.get("/categoria", listarCategorias);
rotasAbertas.post("/usuario", validarCampos(schemaCadastro), cadastrarUsuario);
rotasAbertas.post("/login", validarCampos(schemaLogin), logarUsuario);

module.exports = rotasAbertas