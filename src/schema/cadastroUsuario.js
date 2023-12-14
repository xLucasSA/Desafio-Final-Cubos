const joi = require("joi");

const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': "É obrigatório um nome para o novo usuário.",
        'string.empty': "É obrigatório um nome para o novo usuário..",
    }),
    email: joi.string().email().required().messages({
        'any.required': "É obrigatório um email válido para cadastrar o novo usuário.",
        'string.empty': "É obrigatório um email válido para cadastrar o novo usuário.",
        'string.email': "É obrigatório um email válido para cadastrar o novo usuário."
    }),

    senha: joi.alternatives().try(
        joi.string().trim().required().messages({
            'any.required': "Favor inserir uma senha.",
            'string.empty': "Favor inserir uma senha válida.",
        }),
        joi.number().required().messages({
            'any.required': "Favor inserir uma senha.",
            'number.base': "Senha inválida.",
        })
    )

})

module.exports = schemaUsuario