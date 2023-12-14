const express = require('express');
const clientes = express()

const { listarCliente } = require("../controladores/clientes/listarCliente");
const { detalharCliente } = require("../controladores/clientes/detalharCliente");
const { atualizarClientes } = require("../controladores/clientes/atualizarClientes");
const { cadastrarCliente } = require("../controladores/clientes/cadastrarCliente");

const validarCampos = require("../intermediarios/validarCampos");
const schemaCliente = require("../schema/cadastroCliente");

clientes.get("/cliente", listarCliente);
clientes.get("/cliente/:id", detalharCliente);
clientes.put("/cliente/:id", validarCampos(schemaCliente), atualizarClientes);
clientes.post("/cliente", validarCampos(schemaCliente), cadastrarCliente);

module.exports = clientes