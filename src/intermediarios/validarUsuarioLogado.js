const jwt = require("jsonwebtoken");
const knex = require("../conexaoDb");

const validarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const usuarioEcontrado = await knex("usuarios").where({ id });
    if (!usuarioEcontrado[0]) {
      return res
        .status(401)
        .json({ mensagem: "Favor efetuar o login novamente." });
    }

    if (usuarioEcontrado.length !== 1) {
      return res
        .status(401)
        .json({ mensagem: "Favor efetuar o login novamente." });
    }
    const { senha: _, ...usuario } = usuarioEcontrado[0];
    req.usuario = usuario;
    next();
  } catch (erro) {
    return res.status(500).json({
      mensagem:
        "Erro interno do servidor durante login. Favor tente novamente mais tarde.",
    });
  }
};

module.exports = validarUsuarioLogado;
