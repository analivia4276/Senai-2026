function reajustar(){
    let valorCompra = Number(document.getElementById('frete').value);
    let resultado = document.getElementById('resultado');

    let frete = 20;
    if (valorCompra >= 150) {
        frete = 0;
    }

    let valorTotal = valorCompra + frete;

    resultado.innerHTML = `
        Valor do frete: R$ ${frete.toFixed(2)} <br>
        Valor total da compra: R$ ${valorTotal.toFixed(2)}
    `;
}