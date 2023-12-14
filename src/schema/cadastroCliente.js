const joi = require("joi");

const schemaCliente = joi.object({

  nome: joi.string().trim().required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome não pode estar vazio",
    "any.required": "O nome é obrigatório",
  }),
  email: joi.string().trim().email().required().messages({
    "string.base": "O email deve ser um texto",
    "string.empty": "O email não pode estar vazio",
    "string.email": "O email deve ser um email válido",
    "any.required": "O email é obrigatório",
  }),
  cpf: joi.string().trim().length(11).required().messages({
    "string.base": "O CPF deve ser um texto",
    "string.empty": "O CPF não pode estar vazio",
    "string.length": "O CPF deve ter 11 caracteres",
    "any.required": "O CPF é obrigatório",
  }),
  cep: joi.string().trim().length(8).messages({
    "string.base": "O CEP deve ser um texto",
    "string.empty": "O CEP não pode estar vazio",
    "string.length": "O CEP deve ter 8 caracteres",
  }),
  rua: joi.string().trim().messages({
    "string.base": "A rua deve ser um texto",
    "string.empty": "A rua não pode estar vazia",
  }),
  numero: joi.string().trim().messages({
    "string.base": "O número deve ser um texto",
    "string.empty": "O número não pode estar vazio",
  }),
  bairro: joi.string().trim().messages({
    "string.base": "O bairro deve ser um texto",
    "string.empty": "O bairro não pode estar vazio",
  }),
  cidade: joi.string().trim().messages({
    "string.base": "A cidade deve ser um texto",
    "string.empty": "A cidade não pode estar vazia",
  }),
  estado: joi.string().trim().length(2).messages({
    "string.base": "O estado deve ser um texto",
    "string.empty": "O estado não pode estar vazio",
  }),
});

module.exports = schemaCliente;
