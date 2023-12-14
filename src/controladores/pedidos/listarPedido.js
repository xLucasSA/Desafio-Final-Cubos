const knex = require("../../conexaoDb");

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;
  
  try {
    function gerarResponse(pedido, produtos) {
        const resultado = pedido.map((p) => {
            let pedido_produtos = produtos.filter((prod) => {
              return p.id == prod.pedido_id;
            });
            return {
              pedido: p,
              pedido_produtos,
            };
          });
        
        return resultado
    }

    if (cliente_id){
        const clienteExiste = await knex("clientes")
        .where({ id: cliente_id})
        .first();

        if (!cliente_id || !clienteExiste) {
            const pedido = await knex("pedidos");
            const produtos = await knex("pedido_produtos");
            return res.status(200).json(gerarResponse(pedido, produtos))
        }

        if (clienteExiste){
            const pedidos = await knex("pedidos").where("cliente_id", cliente_id);
            const subquery = knex
                .select("id")
                .from("pedidos")
                .where("cliente_id", cliente_id);
            const pedido_produto = await knex("pedido_produtos").whereIn(
                "pedido_id",
                subquery
            );
            
            return res.status(200).json(gerarResponse(pedidos, pedido_produto))
        }
    }
    else{
        const pedido = await knex("pedidos");
        const produtos = await knex("pedido_produtos");
        return res.status(200).json(gerarResponse(pedido, produtos))
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
module.exports = listarPedidos;