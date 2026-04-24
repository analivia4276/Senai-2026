function calcular() {

    let valor = Number(document.getElementById("valor").value);
    let resultado = document.getElementById("resultado");

    let cashback = 0;

    if (valor > 300) {
        cashback = valor * 0.05;
    }

    let valorLiquido = valor - cashback;

    resultado.innerHTML =
        "Valor do cashback: R$ " + cashback.toFixed(2) +
        "<br>Valor líquido da compra: R$ " + valorLiquido.toFixed(2);
}