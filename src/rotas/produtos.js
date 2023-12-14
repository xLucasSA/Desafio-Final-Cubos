const express = require('express');
const produtos = express()

const listarProdutos = require("../controladores/produtos/listarProdutos");
const cadastrarProdutos = require("../controladores/produtos/cadastrar");
const detalharProduto = require("../controladores/produtos/detalharProduto");
const editarProduto = require("../controladores/produtos/editar");
const excluirProduto = require("../controladores/produtos/excluir");

const validarCampos = require("../intermediarios/validarCampos");
const schemaProduto = require("../schema/produto");
const multer = require('../intermediarios/multer');

produtos.get("/produto", listarProdutos);
produtos.post("/produto", multer.single('imagem'), validarCampos(schemaProduto), cadastrarProdutos);
produtos.get("/produto/:id", detalharProduto);
produtos.put("/produto/:id", multer.single('imagem'), validarCampos(schemaProduto), editarProduto);
produtos.delete("/produto/:id", excluirProduto);

module.exports = produtos