const validarCampos = (schemas) => async (req, res, next) => {
  try {
    await schemas.validateAsync(req.body);
    next();
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message });
  }
};

module.exports = validarCampos;
