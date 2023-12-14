const knex = require("../../conexaoDb");
const bcrypt = require("bcrypt");

const editarUsuarioLogado = async (req, res) => {
  const { id: idUsuario } = req.usuario;
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(String(senha), 10);

    const usuarioExiste = await knex("usuarios")
      .where({ id: idUsuario })
      .first();
    if (!usuarioExiste) {
      return res.status(404).json({ mensagem: "Usuário não foi encontrado." });
    }

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (emailUsuarioExiste) {
        return res.status(400).json({ mensagem: "O Email já foi cadastrado." });
      }
    }

    await knex("usuarios")
      .update({ nome, email, senha: senhaCriptografada })
      .where({ id: idUsuario });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  editarUsuarioLogado,
};
