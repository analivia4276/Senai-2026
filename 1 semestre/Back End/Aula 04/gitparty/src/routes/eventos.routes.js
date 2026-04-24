const express = require("express");
const router = express.Router();

const {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
} = require("../controllers/eventos.controller");

// CRUD padrão REST
router.post("/", cadastrar);
router.get("/", listar);
router.get("/:id", buscar);
router.put("/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;