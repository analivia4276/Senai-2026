function reajustar() {
    let preco = Number(document.getElementById('preco').value);
    let resultado = document.getElementById('resultado');
    let desconto = 0;

    if (preco > 200)
        desconto = preco * 5 / 100;
    
    let valordesconto = Number(preco - desconto);

    resultado.innerHTML = `Valor do Desconto R$ ${desconto.toFixed(2)} 
    <br>Valor final a Pagar R$ ${valordesconto.toFixed(2)}`;
}