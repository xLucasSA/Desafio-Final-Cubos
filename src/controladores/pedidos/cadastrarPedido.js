const knex = require("../../conexaoDb")
const send = require("../../nodemailer")

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        const cliente = await knex("clientes").where({ id: cliente_id }).first()
        if (!cliente) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }

        const objetoProdutos = pedido_produtos.reduce((acumulador, atual) => {
            acumulador.idArray.push(atual.produto_id)
            acumulador[atual.produto_id]
                ? acumulador.produtoRepetido = true
                : acumulador[atual.produto_id] = atual

            return acumulador
        },
            {
                idArray: [],
                produtoRepetido: false
            }
        )

        if (objetoProdutos.produtoRepetido) {
            return res.status(400).json({ mensagem: "Há produtos repetidos no pedido" })
        }

        const produtosPedidos = await knex("produtos")
        .whereIn("id", objetoProdutos.idArray)
        if (objetoProdutos.idArray.length !== produtosPedidos.length) {
            return res.status(404).json({ mensagem: "Produtos solicitados não encontrados" })
        }

        let valor_total = 0
        produtosPedidos.forEach(item => {
            if (item.quantidade_estoque < objetoProdutos[item.id].quantidade_produto) {
                return res.status(400).json({ mensagem: `Produto de ID: ${item.id} sem estoque no momento` })
            }
            valor_total += objetoProdutos[item.id].quantidade_produto * item.valor

            item.quantidade_produto = objetoProdutos[item.id].quantidade_produto
        })
      
        await Promise.all(produtosPedidos.map( item => {
            return knex("produtos")
            .update({ quantidade_estoque: item.quantidade_estoque - item.quantidade_produto})
            .where({ id: item.id})
        }))

        const idPedido = await knex("pedidos").insert({cliente_id, observacao, valor_total},"id")
        const produtosPedidosCorrigidos = produtosPedidos.map( item => {
            const { id: produto_id, quantidade_produto, valor: valor_produto } = item
            return {
                pedido_id: idPedido[0].id,
                produto_id,
                quantidade_produto,
                valor_produto,
            }
        })

        const produtosPedidoCadastrado = await knex("pedido_produtos").insert(produtosPedidosCorrigidos, "*")
        if (!produtosPedidoCadastrado[0]) {
            return res.status(500).json({ mensagem: "Falha ao efetuar o cadastro do pedido, tente novamente" })
        }

        send(cliente.email, "Pedido Solicitado", "Seu pedido foi efetuado com sucesso!")

        return res.status(201).json({ mensagem: "Pedido realizado" })
      
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: "Erro interno no servidor, tente novamente mais tarde." })
    }
}

module.exports = {
    cadastrarPedido
}