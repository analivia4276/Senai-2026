let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

function irParaCadastro() {
    window.location.href = "index.html"; 
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("dados")) {
        renderizarTabela();
    }
});

function abrirModal(){
    document.getElementById("modal").style.display = "block";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function salvarFilme(){
    const capa = document.getElementById("capa").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value;
    const classificacao = document.getElementById("classificacao").value;
    const produtora = document.getElementById("produtora").value.trim();

    if(!nome || !genero){
        alert("Nome e Gênero são obrigatórios!");
        return;
    }

    const novoFilme = {
        id: Date.now(),
        capa,
        nome,
        genero,
        ano,
        classificacao,
        produtora
    };

    filmes.push(novoFilme);
    atualizarLocalStorage();
    renderizarTabela();
    fecharModal();
}

function renderizarTabela(){
    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";

    filmes.forEach(filme =>{
        tabela.innerHTML += `
        <tr>
            <td><img src="${filme.capa}" width="60"></td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>
            <td>
            <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
            </tr>
            `;
        });
}

function excluirFilme(id){
    if(!confirm("Deseja realmente excluir?")) return;

    filmes = filmes.filter(filme => filme.id !== id);
    atualizarLocalStorage();
    renderizarTabela();
}

function atualizarLocalStorage(){
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function limparCampos(){
    document.getElementById("capa").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("classificacao").value = "";
    document.getElementById("produtora").value = "";
}

function filtrarGenero(){
    const filtro = document.getElementById("filtroGenero").value.toLowerCase();
    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";

    filmes.filter(filme => filme.genero.toLowerCase().includes(filtro)).forEach(filme =>{
        tabela.innerHTML += `
        <tr>
            <td><img src="${filme.capa}" width="60"></td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>
            <td>
            <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
            </tr>
            `;
        });
}
