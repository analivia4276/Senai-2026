const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const { usuariosId, eventosId, status } = req.body;

    const item = await prisma.inscricoes.create({
        data: {
            status,
            usuarios: {
                connect: { id: usuariosId }
            },
            eventos: {
                connect: { id: eventosId }
            }
        }
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.inscricoes.findMany({
        include: { eventos: true, usuarios: true }
    });

    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.inscricoes.findUnique({
        where: { id: Number(id) },
        include: { eventos: true, usuarios: true }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.inscricoes.update({
        where: { id: Number(id) },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const inscricao = await prisma.inscricoes.findUnique({
        where: { id: Number(id) },
        include: { eventos: true }
    });

    if (!inscricao) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    if (inscricao.status === "CANCELADA") {
        return res.status(400).json({
            erro: "Inscrição já está cancelada"
        });
    }

    const agora = new Date();
    const dataEvento = new Date(inscricao.eventos.data_evento);

    const dataLimite = new Date(dataEvento);
    dataLimite.setHours(dataLimite.getHours() - 24);

    if (agora >= dataLimite) {
        return res.status(400).json({
            erro: "Cancelamento não permitido (menos de 24h para o evento)"
        });
    }

    await prisma.inscricoes.update({
        where: { id: Number(id) },
        data: { status: "CANCELADA" }
    });

    const proximo = await prisma.inscricoes.findFirst({
        where: {
            eventosId: inscricao.eventosId,
            status: "LISTA_ESPERA"
        },
        orderBy: {
            data_inscricao: "asc"
        }
    });

    if (proximo) {
        await prisma.inscricoes.update({
            where: { id: proximo.id },
            data: { status: "CONFIRMADA" }
        });
    }

    res.status(200).json({
        mensagem: "Inscrição cancelada e lista de espera atualizada"
    });
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};