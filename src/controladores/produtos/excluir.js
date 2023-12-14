const knex = require("../../conexaoDb");
const { excluirImagem, getPath } = require("../../servicos/uploads");

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex("produtos")
            .where({
                id,
            })
            .first();

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        const produtoComprado = await knex("pedido_produtos").where(
            "produto_id",
            id
        );
        if (produtoComprado.length > 0) {
            return res
                .status(400)
                .json(
                    "O produto está vinculado a ao menos um pedido e não pode ser excluído."
                );
        }

        const produtoExcluido = await knex("produtos")
            .where({
                id,
            })
            .del();

        if (!produtoExcluido) {
            return res.status(400).json({ mensagem: "O produto não foi excluido" });
        }

        const url = produto.produto_imagem
        if (url) {
            await excluirImagem(getPath(url))
        }

        return res.status(200).json({ mensagem: "Produto excluido com sucesso" });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = excluirProduto;
