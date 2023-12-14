const knex = require("../../conexaoDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require("../../schema/cadastroUsuario");

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioEcontrado = await knex("usuarios").where({ email });
    if (!usuarioEcontrado[0]) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos." });
    }

    if (usuarioEcontrado.length !== 1) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos." });
    }

    const senhaCorreta = await bcrypt.compare(
      String(senha),
      usuarioEcontrado[0].senha
    );
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: usuarioEcontrado[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    const { senha: _, ...usuario } = usuarioEcontrado[0];

    return res.status(200).json({ usuario, token });
  } catch (erro) {

    return res.status(500).json({
      mensagem: "Erro interno do servidor. Favor tentar novamente mais tarde!",
    });
  }
};

module.exports = {
  logarUsuario,
};
