const express = require("express");
const router = express.Router();

const carrosController = require("../Controller/carros.controller");

router.post("/", carrosController.cadastrar);
router.get("/", carrosController.listar);
router.get("/:id", carrosController.buscar);
router.put("/:id", carrosController.atualizar);
router.delete("/:id", carrosController.excluir);

module.exports = router;