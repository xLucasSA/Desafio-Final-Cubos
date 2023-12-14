const knex = require("../../conexaoDb");
const { uploadImagem } = require("../../servicos/uploads");

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const file = req.file;
    let originalname, buffer, mimetype;

    if (file) {
        originalname = file.originalname
        mimetype = file.mimetype
        buffer = file.buffer
    }

    try {
        const produto = await knex('produtos')
            .where({
                id
            }).first();

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

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

        const editarProduto = await knex('produtos')
            .where({
                id: produto.id
            }).update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: imagemUrl
            }).returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id', 'produto_imagem']);

        if (!editarProduto) {
            return res.status(400).json({ mensagem: "Erro ao editar produto." });
        }

        return res.status(200).json(editarProduto[0]);
    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = editarProduto
