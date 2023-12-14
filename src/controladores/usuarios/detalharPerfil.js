const detalharPerfil = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  detalharPerfil,
};
