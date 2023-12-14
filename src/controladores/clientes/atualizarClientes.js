const knex = require('../../conexaoDb');

const atualizarClientes = async (req, res) => {
    const { 
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    } = req.body
    const { id } = req.params

    try {
        const cliente = await knex("clientes").where({ id }).first()
        if (!cliente){
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }
        
        const cpfOuEmailEmUso = await knex("clientes")
        .where({ cpf })
        .andWhere("id", "<>", id)
        .orWhere({ email })
        .andWhere("id", "<>", id)
        .first()
        if (cpfOuEmailEmUso){
            return res.status(400).json({ mensagem: "CPF ou e-mail já em uso." })
        }

        const clienteAtualizado = await knex("clientes")
        .update({
            nome,
            email,
            cpf,
            cep: cep || cliente.cep,
            rua: rua || cliente.rua,
            numero: numero || cliente.numero,
            bairro: bairro || cliente.bairro,
            cidade: cidade || cliente.cidade,
            estado: estado || cliente.estado
        })
        .where({id})
        .returning("*")

        if (!clienteAtualizado[0]){
            return res.status(500).json({ mensagem: "Erro interno do servidor, tente novamente mais tarde." })
        }

        return res.status(204).json();
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor, tente novamente mais tarde." })
    }
}

module.exports = {
    atualizarClientes
}