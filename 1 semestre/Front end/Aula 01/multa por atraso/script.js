function calcular() {

    let mensalidade = Number(document.getElementById("mensalidade").value);
    let dias = Number(document.getElementById("dias").value);
    let resultado = document.getElementById("resultado");

    let multa = 0;

    if (dias > 0) {
        multa = mensalidade * 0.02;
    }

    let total = mensalidade + multa;

    resultado.innerHTML =
        "Valor da multa: R$ " + multa.toFixed(2) +
        "<br>Valor total a pagar: R$ " + total.toFixed(2);
}