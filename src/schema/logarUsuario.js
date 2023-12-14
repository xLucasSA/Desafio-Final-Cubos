const joi = require("joi");

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        'any.required': "Favor inserir um email.",
        'string.empty': "Favor inserir um email.",
        'string.email': "Favor inserir um email válido."
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

module.exports = schemaLogin