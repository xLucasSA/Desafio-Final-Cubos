const knex = require("../../conexaoDb");

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await knex("clientes").where("id", id).first();
    if (!cliente) {
      return res
        .status(404)
        .json("Não foi encontrado cliente com o ID informado");
    }
    return res.status(200).json(cliente);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = { detalharCliente };
