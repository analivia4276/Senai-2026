const API = "http://localhost:3000/eventos";

// modal
function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// listar
async function carregarEventos() {
    const res = await fetch(API);
    const eventos = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    eventos.forEach(e => {
        const li = document.createElement("li");

        li.innerHTML = `
            <h3>${e.nome}</h3>
            <p>${e.descricao || ""}</p>
            <p>${e.data_evento}</p>

            <button onclick="excluirEvento(${e.id})">Excluir</button>
        `;

        lista.appendChild(li);
    });
}

// criar
async function criarEvento() {
    const data = {
        nome: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        data_evento: document.getElementById("data").value,
        local: document.getElementById("local").value,
        capacidade: document.getElementById("capacidade").value
    };

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    fecharModal();
    carregarEventos();
}

// excluir
async function excluirEvento(id) {
    await fetch(`${API}/excluir/${id}`, {
        method: "DELETE"
    });

    carregarEventos();
}

// start
carregarEventos();