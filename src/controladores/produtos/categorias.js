const knex = require("../../conexaoDb");

async function listarCategorias(req, res) {
  try {
    const categorias = await knex("categorias").select("descricao");
    const categoriasFormatadas = categorias.map((categoria) => {
      return categoria.descricao;
    });
    return res.status(200).json(categoriasFormatadas);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = listarCategorias;


