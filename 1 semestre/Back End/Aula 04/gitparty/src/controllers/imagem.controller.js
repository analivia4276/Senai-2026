const prisma = require("../data/prisma");

const uploadImagem = async (req, res) => {
  try {
    const { id } = req.params;

    const imagem = await prisma.imagem.create({
      data: {
        nomeOriginal: req.file.originalname,
        nomeArquivo: req.file.filename,
        mimeType: req.file.mimetype,
        path: req.file.path,
        eventosId: parseInt(id),
      },
    });

    return res.status(201).json(imagem);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao salvar imagem" });
  }
};

module.exports = {
  uploadImagem,
};