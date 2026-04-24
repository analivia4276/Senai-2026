const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadImagem");
const { uploadImagem } = require("../controllers/imagem.controller");

router.post("/eventos/:id/imagem", upload, uploadImagem);

module.exports = router;