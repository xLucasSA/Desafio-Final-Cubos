const knex = require("../../conexaoDb");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, bairro, rua, numero, cidade, estado } =
    req.body;
  try {
    const cpfExiste = await knex("clientes").where({ cpf }).first();
    if (cpfExiste) {
      return res.status(400).json("Este CPF já está cadastrado.");
    }
    const emailExiste = await knex("clientes").where({ email }).first();
    if (emailExiste) {
      return res.status(400).json("Este email já está cadastrado.");
    }
    const cliente = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        bairro,
        rua,
        numero,
        cidade,
        estado,
      })
      .returning("*");
    if (!cliente) {
      return res.status(400).json("O cliente não foi cadastrado.");
    }
    return res.status(201).json("Cliente cadastrado com sucesso.");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor.");
  }
};

module.exports = { cadastrarCliente };
