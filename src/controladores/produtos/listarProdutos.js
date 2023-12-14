const knex = require("../../conexaoDb");

async function listarProdutos(req, res) {
  const { categoria_id } = req.query;

  try {
    const produtos = await knex("produtos");

    if (categoria_id) {
      const produtosFiltrados = produtos.filter((el) => {
        return categoria_id.includes(el.categoria_id);
      });
      return res.status(200).json(produtosFiltrados);
    } else {
      return res.status(200).json(produtos);
    }
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = listarProdutos;
