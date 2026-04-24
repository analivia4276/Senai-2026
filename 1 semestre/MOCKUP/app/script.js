function carregarDados(){
    fetch('../data/produtos.json')
    .then(response => response.json())
    .then(response => renderizaCards(response))
}

function renderizaCards(dados){
    const main = document.querySelector("main")
    main.innerHTML = ""
    dados.forEach(produto => {
        const card = document.createElement("div")
        card.classList.add('card')
        card.innerHTML = `
        <h2>${produto.nome}</h2>
        <img src = "${produto.img != ''?produto.img:'./assents/nenhum.png'}">
        `
        main.appendChild(card)
    });
}