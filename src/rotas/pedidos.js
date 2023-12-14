const express = require('express');
const pedidos = express()

const validarCampos = require("../intermediarios/validarCampos")
const { cadastrarPedido } = require("../controladores/pedidos/cadastrarPedido")

const cadastroPedido = require('../schema/cadastroPedido')
const listarPedidos = require('../controladores/pedidos/listarPedido');

pedidos.post("/pedido", validarCampos(cadastroPedido), cadastrarPedido)
pedidos.get("/pedido", listarPedidos);

module.exports = pedidos