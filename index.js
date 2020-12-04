class Maverick{
    constructor() {
        this.mavericks = localStorage.getItem('tbMaverick') === null
        ?[]
        : JSON.parse(localStorage.getItem('tbMaverick'))
    }

    salva(maverick){
        // o registro está sendo editado?
        if(document.getElementById('kart').getAttribute('disabled')==='disabled'){
            this.apaga(maverick.kart)
        }
        this.mavericks.push(maverick) // adiciona um novo elemento ao array
        localStorage.setItem('tbMaverick', JSON.stringify(this.mavericks))
        alert('Tempo e piloto salvos com sucesso!')
    }

    apaga(kart){
        let index = this.mavericks.findIndex(maverick=> maverick.kart == kart)
        this.mavericks.splice(index, 1) // index é o elemento do array
        //salvando a alteração
        localStorage.setItem('tbMaverick', JSON.stringify(this.mavericks))
        maverick.atualiza()       
    }

    edita(maverick){
        document.getElementById('kart').setAttribute('disabled', 'disabled')
        document.getElementById('kart').value = maverick.codigo
        document.getElementById('piloto').value = maverick.piloto
        document.getElementById('parada').value = maverick.parada
        document.getElementById('entrada').value = maverick.entrada
        document.getElementById('saida').value = maverick.saida
        document.getElementById('observacoes').value = maverick.observacoes
        document.getElementById('pista').value = maverick.pista
        document.getElementById('tempo').value = maverick.tempo
        document.getElementById('credito').value = maverick.credito
    }

    lista(){
        const listagem = this.mavericks.map((maverick) => (
            `
            <tr>
            <td>${maverick.kart}</td>
            <td>${maverick.piloto}</td>
            <td>${maverick.parada}</td>
            <td>${maverick.entrada}</td>
            <td>${maverick.saida}</td>
            <td>${maverick.observacoes}</td>
            <td>${maverick.credito}</td>

            <td>
                <button id='apagar' onClick='maverick.apaga(${maverick.kart})'>
                🗑️Apagar</button>
                <button id='editar' onClick='maverick.edita(${JSON.stringify(maverick)})'>
                ✏️Editar</button>

            </td>
            </tr>
            `
        ))
        return(`<table border='1' class = 'paleBlueRows'>
        <caption>Controle</caption>
        <thead>
              <th>kart</th>
              <th>Piloto</th>
              <th>Parada</th> 
              <th>H/entrada</th> 
              <th>H/saída</th>   
              <th>Observações</th>
              <th>Crédito</th>
              <th>Opções</th>
            </thead>
            <tbody>${listagem}</tbody>
            </table>
        `)
    }

    atualiza(){
        document.getElementById('listagem').innerHTML = maverick.lista()
    }
}

//instanciamos um novo objeto

const maverick = new Maverick()
// tratamos o botão salvar
document.getElementById('salvar').onclick = function (){
    const registro ={
        kart:document.getElementById('kart').value,
        piloto:document.getElementById('piloto').value,
        parada:document.getElementById('parada').value,
        tempo:document.getElementById('tempo').value,
        pista:document.getElementById('pista').value,
        entrada:document.getElementById('entrada').value,
        saida:document.getElementById('saida').value,
        observacoes:document.getElementById('observacoes').value,
        credito:document.getElementById('credito').value
    }
    maverick.salva(registro)
}
// tratamos a listagem
window.onload = function(){
    maverick.atualiza()
}
document.getElementById('saida').onchange = function () {
    let horaPista = 0
    let minutoPista = 0
    let entrada = document.getElementById('entrada').value
    let saida = document.getElementById('saida').value
    //Saiba mais sobre o split - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split    
    //Efetua o split no campo entrada
    var time1 = entrada.split(":");
    //Efetua o split no campo saida
    var time2 = saida.split(":");
    //Obtendo o tempo em minutos
    var min1 = time1[0] * 60 + time1[1] * 1
    var min2 = time2[0] * 60 + time2[1] * 1
    //Separando a hora e os minutos
    horaPista = parseInt(((min2 - min1) / 60))
    minutoPista = ((min2 - min1) - (horaPista * 60))
    //Convertendo em texto com zero a esquerda
    const horaPistaTexto = horaPista.toString().padStart(2,'0')
    const minutoPistaTexto = minutoPista.toString().padStart(2,'0')
    document.getElementById('pista').value = horaPistaTexto+':'+minutoPistaTexto
}
