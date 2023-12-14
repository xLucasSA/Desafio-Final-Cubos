const joi = require("joi")

const cadastroPedido = joi.object({
    cliente_id: joi.number().required().messages({
        'any.required': "O cliente_id é obrigatório",
        'number.base': "O valor do cliente_id deve ser um número"
    }),
    observacao: joi.string().optional().messages({
        'string.base': "A observação precisa ser uma string"
    }),

    pedido_produtos: joi.array().items({
        produto_id: joi.number().required().messages({
            'any.required': "O produto_id é obrigatório",
            'number.base': "O valor do produto_id deve ser um número"
        }),
        quantidade_produto: joi.number().required().messages({
            'any.required': "Quantidade de produto é obrigatória",
            'number.base': "Valor da Quantidade de Produto deve ser um número"
        })
    }).min(1).required().messages({
        'array.min': "Deve ter no mínimo 1 item na lista de pedido_produtos",
        'array.base': "Os dados de pedido_produtos devem estar em formato array",
        'any.required': "O pedido_produtos é obrigatório"
    })
})

module.exports = cadastroPedido