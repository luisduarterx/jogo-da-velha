// Dados Iniciais
let quadro = {
    a1: '', a2:'', a3: '',
    b1:'', b2:'', b3:'',
    c1:'',c2:'',c3:''
}

let vez = ''
let aviso = '' // true == jogo finalizado / else = jogo rodando
let statusJogo = ''

resetar()// Resete inicial do jogo

//Eventos
document.querySelectorAll('.secao').forEach(item =>{
    item.addEventListener('click', itemClick)
})
document.querySelector('#fechar').addEventListener('click', abrirCaixa)


//Functions
function MostrarNotificacao(situacao,player){
    document.querySelector('#caixa').classList.remove('disabled')
    if(situacao == true){
        
        if(player == 'x'){
            document.querySelector('.winner').innerHTML ='<h1>Parabens!</h1><p>Voce ganhou utilizando o icone <strong>X</strong</p>'
        }else if(player == 'o'){
            document.querySelector('.winner').innerHTML ='<h1>Parabens!</h1><p>Voce ganhou utilizando o icone <strong>O</strong</p>'
        }
    }else{
        document.querySelector('.winner').innerHTML ='<h1>EMPATOU!</h1><p>nao tivemos nenhum ganhador nessa rodada</p>'
    }

}
function abrirCaixa(){
    document.querySelector('#caixa').classList.add('disabled')
}
function VerificaEmpate(){
    for( let i in quadro){
        if(quadro[i] === ''){
            return false
        }

    }
    return true
}
function VerificaGanhador(x){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'c1,c2,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in pos){
        let teste = pos[w].split(',')
        let testeVenceu = teste.every((opcao) =>{
            if(quadro[opcao] === x){
                
                return true
            }else{
                return false
            }
        })

        if(testeVenceu){
            return true
        }
    }
}

function verificarJogo(){
    if(VerificaGanhador('x')){
        document.querySelector('.win').innerHTML = 'X ganhou'
        aviso = true
        MostrarNotificacao(true,'x')
    }else if(VerificaGanhador('o')){
        document.querySelector('.win').innerHTML = '<h3>O</h3> ganhou'
        aviso = true
        MostrarNotificacao(true,'o')
    }else if(VerificaEmpate()){
        document.querySelector(`.win`).innerHTML = "VELHA"
        MostrarNotificacao(false)
    
}}

function atualizar(){
    for( let i in quadro){
    let item = document.querySelector(`td[data-item=${i}]`)
    item.innerHTML = quadro[i]

    document.querySelector('.vez').innerHTML = vez
}
}
function itemClick(e){
    if(aviso === true){
        alert('Esse Jogo ja acabou, reinicie e comece novamente')
        return
    }
    let item = e.target.getAttribute('data-item')
    if(quadro[item]== ''){
        quadro[item] = vez
    }else{
        alert("ja foi escolhido escolha outro")
        return
    }
        //troca a vez par ao proximo e atualiza quadro sua vez
    
    
    
    vez = vez == 'x'? 'o': 'x'
    


    atualizar()
    verificarJogo()
    
}
function escolherVez(){
    let num =  Math.floor((Math.random() * (1 - 0 + 1) + 0))
    vez = (num === 0) ? 'x':'o'
}
function resetar(){
    
    //escolher jogador
    escolherVez()
    //mostrar informacoes
    document.querySelector('.win').innerHTML = ''
    //resetar quadros
    for( let i in quadro){
        quadro[i] = ''    }
        
        atualizar()
        aviso = false
        abrirCaixa()
}

