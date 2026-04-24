const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        let {nome, cpf, email, cnh} = req.body;

        nome = nome.trim();
        const partesNome = nome.split(" ");

        if (partesNome.length < 2) {
            return res.status(400).json({erro: "Nome completo obrigatório!"});
        }

        cpf = cpf.replace(".", "");
        cpf = cpf.replace(".", "");
        cpf = cpf.replace("-", "");

        if (cpf.length !== 11) {
            return res.status(400).json({erro: "CPF deve ter 11 números"});
        }

        email = email.toLowerCase();

        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({erro: "Email inválido"});
        }

        const cnhArray = cnh.split("");

        if (isNaN(cnhArray[0])) {
            return res.status(400).json({erro: "CNH deve começar com número"});
        }

        const novo = await prisma.cliente.create({
            data: {
                nome,
                cpf,
                email,
                cnh
            }
        });

        res.status(201).json(novo);

    } catch (error) {
        res.status(500).json({erro: "Erro ao cadastrar cliente"});
    }
};

module.exports = { 
    cadastrar 
};