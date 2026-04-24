const prisma = require("../data/prisma");

const listadois = async (req, res) => {
    try {
        const lista = await prisma.lista.findMany();

        res.json(lista).status(200).end();
    }catch(err) {
        res.json(err).status(500).end();
    }
};

const con = require("../data/connection");

const listarItens = async (req, res) => {
    try{
        const [lista] = await con.query("SELECT * FROM lista");
        res.json(lista).status(200).end();
    }catch (err) {
        res.json(err).status(500).end();
    }
};

// const cadastrarItem = async (req, res) => {
//     try{
//         const {item, valor} = req.body;

//         const insert = 'INSERT INTO lista (item, valor) VALUES (?, ?)';

//         const result = await con.query(insert, [item, valor]);

//         res.status(201).end();
//     } catch(err) {
//         res.json(err).status(500).end();
//     }
// };

const cadastrarItem = async (req, res) => {
    try {
        const item = req.body;

        const novoItem = await prisma.lista.create({
            data: item
        });
        
        res.json(novoItem).status(201).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};

const atualizarItem = async (req, res) => {
    try {
        const {id} = req.params;

        const item = req.body;

        const update = await prisma.lista.update({
            where: { id: Number(id) },
            data: item
        });

        res.json(update).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};

const apagarItem = async (req, res) => {
    try {
        const {id} = req.params;

        const del = await prisma.lista.delete({
            where: { id : Number(id)}
        });

        res.json(del).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
}

module.exports = {
    listadois,
    cadastrarItem,
    listarItens,
    atualizarItem,
    apagarItem
}