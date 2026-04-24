function reajustar() {
    let preco = Number(document.getElementById('preco').value);
    let resultado = document.getElementById('resultado');
    let taxa = 0;

    if(preco > 100){
        taxa = preco * 10 / 100;
    }

    let valorTaxa = Number(preco - taxa);

    resultado.innerHTML = `valor da taxa de R$ ${taxa.toFixed(2)} 
    <br> valor total da conta R$ ${valorTaxa.toFixed(2)}`;
}