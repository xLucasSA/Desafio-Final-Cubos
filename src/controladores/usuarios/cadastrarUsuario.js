const knex = require("../../conexaoDb");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex("usuarios").where({ email }).first();
    if (emailExiste) {
      return res.status(400).json("O email já existe");
    }

    const senhaCripto = await bcrypt.hash(String(senha), 10);

    await knex("usuarios").insert({ nome, email, senha: senhaCripto });

    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {

    return res.status(400).json(error.message);
  }
};
module.exports = { cadastrarUsuario };
