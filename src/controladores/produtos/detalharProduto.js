const knex = require("../../conexaoDb");

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ mensagem: "O produto não foi encontrado" });
    }

    return res.status(200).json(produto);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
};

module.exports = detalharProduto;
