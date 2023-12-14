const knex = require("../../conexaoDb");
const { uploadImagem } = require("../../servicos/uploads");

async function cadastrarProdutos(req, res) {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const file = req.file;
  let originalname, buffer, mimetype;

  if (file) {
    originalname = file.originalname
    mimetype = file.mimetype
    buffer = file.buffer
  }

  try {
    const categoriaExiste = await knex("categorias")
      .where("id", categoria_id)
      .first();
    if (!categoriaExiste) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    const formatoValido = 'image';

    if (mimetype && !mimetype.includes(formatoValido)) {
      return res.status(400).json({ mensagem: "Formato de imagem inválido." });
    }

    const imagem = originalname ? await uploadImagem(
      `${originalname}`,
      buffer,
      mimetype
    ) : null;

    const imagemUrl = imagem ? imagem.url : null;

    const cadastrarProduto = await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: imagemUrl
    }).returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

    return res.status(201).json(cadastrarProduto[0]);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = cadastrarProdutos;
