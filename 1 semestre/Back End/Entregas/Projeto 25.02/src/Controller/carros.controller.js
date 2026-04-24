const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        let {placa, marcaModelo, ano} = req.body;

        placa = placa.trim().toUpperCase().replaceAll(" ", "");

        if (placa.length !== 7)
            return res.status(400).json({erro: "Placa deve ter 7 caracteres"});

        const dadosCarro = marcaModelo.trim().split(" ");

        if (partes.length < 2)
            return res.status(400).json({erro: "Informe marca e modelo do carro"});

        const marca = dadosCarro[0].toLowerCase();
        const modelo = dadosCarro[1].toLowerCase();

        ano = ano.toString();

        if (ano.length !== 4)
            return res.status(400).json({erro: "Ano inválido"});

        const novo = await prisma.carro.create({
            data: {
                placa,
                marca,
                modelo,
                ano
            }
        });

        res.status(201).json(novo);

    } catch (error) {
        res.status(500).json({erro: "Erro ao cadastrar carro"});
    }
};

const listar = async (req, res) => {
    const lista = await prisma.carro.findMany();
    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const {id} = req.params;

    const item = await prisma.carro.findUnique({
        where: {id: Number(id)}
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const {id} = req.params;

    const item = await prisma.carro.update({
        where: {id: Number(id)},
        data: req.body
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const {id} = req.params;

    const item = await prisma.carro.delete({
        where: {id: Number(id)}
    });

    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};