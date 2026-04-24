function reajustar() {
    let salario = Number(document.getElementById('salario').value);
    let resultado = document.getElementById('resultado');
    let bonus = 0;
    
    if(salario > 2000){
        bonus = salario * 10 / 100;
    }

    let bonusSalarial = Number(salario + bonus);

    resultado.innerHTML = `Bônus de R$ ${bonus.toFixed(2)} 
    <br>Salario final R$ ${bonusSalarial.toFixed(2)}`;
}