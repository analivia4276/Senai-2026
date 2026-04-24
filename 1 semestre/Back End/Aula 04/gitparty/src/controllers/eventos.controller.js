const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    data.data_evento = new Date(data.data_evento);

    const item = await prisma.eventos.create({
        data
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.eventos.findMany({
        include: { imagens: true }
    });

    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.eventos.findUnique({
        where: { id: Number(id) },
        include: { imagens: true }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    const evento = await prisma.eventos.update({
        where: { id: Number(id) },
        data: dados
    });

    res.status(200).json(evento);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.eventos.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao excluir evento" });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};