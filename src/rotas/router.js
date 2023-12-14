const express = require("express");
const rotas = express();

const rotasAbertas = require("./rotasAbertas");
const usuarios = require("./usuarios");
const produtos = require("./produtos");
const clientes = require("./clientes");
const pedidos = require("./pedidos");

const validarUsuarioLogado = require("../intermediarios/validarUsuarioLogado");

rotas.use(rotasAbertas);

rotas.use(validarUsuarioLogado);

rotas.use(usuarios);
rotas.use(produtos);
rotas.use(clientes);
rotas.use(pedidos);

module.exports = rotas;
