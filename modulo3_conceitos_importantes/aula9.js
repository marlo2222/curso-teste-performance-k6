//aula: ciclo de vida de testes com k6

//1. inicialização
import sleep from 'k6';


//2. configuração
export const options = {
    vus: 1,
    duration: '10s'
}

//3. execução // codigo vu
export default function(){
    console.log("testando o k6");
    sleep(1);
}

//4. desmontagem
export function teardown(data){
    console.log(data)
}