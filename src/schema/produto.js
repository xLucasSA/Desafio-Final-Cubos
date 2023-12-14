const joi = require("joi");

const schemaProduto = joi.object({
  descricao: joi.string().trim().required().messages({
    "any.required": "O campo descrição é obrigatório",
    "string.empty": "O campo descrição não pode ser vazio",
    "string.alphanum": "O campo descrição deve conter apenas letras e números",
  }),
  quantidade_estoque: joi.number().integer().required().messages({
    "any.required": "O campo quantidade estoque é obrigatório",
    "number.base": "O campo quantidade estoque deve ser um número",
    "number.integer": "O campo quantidade estoque deve ser um número inteiro",
  }),
  valor: joi.number().integer().required().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "O campo valor deve ser um número",
    "number.integer": "O campo valor deve ser um número inteiro",
  }),
  categoria_id: joi.number().integer().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id deve ser um número",
    "number.integer": "O campo categoria_id deve ser um número inteiro",
  }),
});

module.exports = schemaProduto;
