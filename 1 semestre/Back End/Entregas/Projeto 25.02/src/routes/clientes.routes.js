const express = require("express");
const router = express.Router();

const clientesController = require("../Controller/clientes.controller");

router.post("/", clientesController.cadastrar);

module.exports = router;