const knex = require("../../conexaoDb");


const listarCliente = async (req, res) => {
    try {
        const listar = await knex("clientes")//.select('nome');
        return res.status(200).json(listar)

    } catch (erro) {

        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

}
module.exports = { listarCliente }

