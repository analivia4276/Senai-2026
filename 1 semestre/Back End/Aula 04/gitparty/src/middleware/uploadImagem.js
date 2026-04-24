const multer = require("multer");
const path = require("path");

const validarNomeArquivo = (req, file, callback) => {
  const nomeEvento = req.body.nome || "evento";

  const nomeFormatado = nomeEvento
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9\-]/g, "");

  const extensao = path.extname(file.originalname);

  const nomeFinal = Date.now() + "-" + nomeFormatado + extensao;

  callback(null, nomeFinal);
};

const definirDestino = (req, file, callback) => {
  callback(null, "uploads/");
};

const filtrarExtensao = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Apenas imagens JPG, JPEG ou PNG são permitidas"));
  }
};

const armazenamento = multer.diskStorage({
  destination: definirDestino,
  filename: validarNomeArquivo,
});

const upload = (req, res, next) => {
  const filemulter = multer({
    storage: armazenamento,
    fileFilter: filtrarExtensao,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

  filemulter.single("imagem")(req, res, function (erro) {
    if (erro) {
      return res.status(400).json({ erro: erro.message });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    next();
  });
};

module.exports = upload;