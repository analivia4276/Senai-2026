const API = "https://receitasapi-b-2025.vercel.app/receitas";

const container = document.getElementById("grid-receitas");
const modal = document.getElementById("modal");

const btnAdd = document.getElementById("btn-add");
const btnSalvar = document.getElementById("salvar");
const btnFechar = document.getElementById("fechar");

btnAdd.onclick = () => modal.classList.remove("hidden");

btnFechar.onclick = () => modal.classList.add("hidden");

async function buscarReceitas() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    exibirReceitas(data);
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
  }
}

function exibirReceitas(receitas) {
  container.innerHTML = "";

  receitas.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${r.img}" alt="${r.nome}">
      <h3>${r.nome}</h3>
      <p>${r.tipo}</p>
      <p><b>Custo:</b> R$ ${r.custoAproximado}</p>
    `;

    container.appendChild(card);
  });
}

btnSalvar.onclick = async () => {

  const novaReceita = {
    nome: document.getElementById("nome").value,
    tipo: document.getElementById("tipo").value,
    ingredientes: document.getElementById("ingredientes").value,
    modoFazer: document.getElementById("modoFazer").value,
    img: document.getElementById("img").value,
    custoAproximado: parseFloat(document.getElementById("custo").value)
  };

  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaReceita)
    });

    modal.classList.add("hidden");
    buscarReceitas();

  } catch (error) {
    console.error("Erro ao salvar receita:", error);
  }
};

buscarReceitas();