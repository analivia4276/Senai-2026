function reajustar(){
    let salario = Number(document.getElementById('salario').value);
    let resultado = document.getElementById('resultado');
    let bonus = 0;

    if(salario > 2000){
        bonus = salario * 0.10;
    }

    let salarioFinal = Number(salario + bonus);

    resultado.innerHTML = `Valor do bônus: R$ ${bonus.toFixed(2)} <br>
    Salário final: R$ ${salarioFinal.toFixed(2)}`;
}

