require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

const carrosRoutes = require("./src/routes/carros.routes");
const clientesRoutes = require("./src/routes/clientes.routes");

app.use("/carros", carrosRoutes);
app.use("/clientes", clientesRoutes);

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
});