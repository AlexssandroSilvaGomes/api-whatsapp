/*
    Objetivo: criar uma API de contatos para serem consumidas pelo whastapp
    Autor: Alexssandro
    Data: 23/03/23
    Versão: 1.0
*/

//import das funções
const contatos = require('./contatos.js')
const funcs = require('./funcs.js')

//Import das dependências do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')



//cria um objeto com as características do express
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//EndPoint que chama a função que retorna os contatos usando o id como parâmetro
app.get('/V1/whatsapp/perfil/id/:id', cors(), async (request, response, next) => {

    let idContato = request.params.id
    let statusCode
    let dadosContato = {}

    if (idContato == '' || idContato == undefined || idContato.length != 1 || isNaN(idContato)) {

        statusCode = 400
        dadosContato.message = "Não foi possível processar, pois os dados de entrada (id) que foi enviadoo não corresponde ao exigido. Confira o valor, pois não pode ser vazio, precisam ser caracteres e ter dois dígitos."

    } else {
        let contatos = funcs.getContatoId(idContato)
        if (contatos) {
            statusCode = 200
            dadosContato = contatos
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosContato)


})

//EndPoint que chama a função que retorna os contatos usando o numero de telefone como parâmetro
app.get('/V1/whatsapp/perfil/numero/:tel', cors(), async (request, response, next) => {

    let numeroContato = request.params.tel
    let statusCode
    let dadosContato = {}

    if (numeroContato == '' || numeroContato == undefined || numeroContato.length > 11 || numeroContato.length < 10 || isNaN(numeroContato)) {

        statusCode = 400
        dadosContato.message = "Não foi possível processar, pois os dados de entrada (tel) que foi enviadoo não corresponde ao exigido. Confira o valor, pois não pode ser vazio, precisam ser caracteres e ter dois dígitos."

    } else {
        let contatos = funcs.getContatoNumero(numeroContato)
        if (contatos) {
            statusCode = 200
            dadosContato = contatos
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosContato)


})

//roda o serviço da API par aficar aguardando requisições
app.listen(8080, () => {
    console.log('servidor aguardando requisões na porta 8080')
    
})

