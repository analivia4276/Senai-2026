function reajustar(){
    let compra = Number(document.getElementById('compra').value);
    let resultado = document.getElementById('resultado');
    let frete = 20;

    if(compra >= 150){
        frete = 0;
    }

    let total = compra + frete;

    resultado.innerHTML = `Valor do frete: R$ ${frete.toFixed(2)} <br>
    Total da compra: R$ ${total.toFixed(2)}`;
}

