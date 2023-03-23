const contatos = require('./contatos.js')

const getContatoId = ((id) => {
    let jsonContatos = {}
    let status = false

    contatos.contatos['whats-users'].forEach(perfil => {
        if(perfil.id == id) {
            jsonContatos = perfil.contacts
            status = true
        }
    })

    if(status) {
        return jsonContatos
    } else {
        return status
    }
})

const getContatoNumero = ((numeroTelefone) => {
    let jsonContatos = {}
    let status = false

    contatos.contatos['whats-users'].forEach(perfil => {
        if(perfil.number == numeroTelefone) {
            jsonContatos = perfil.contacts
            status = true
        }
    })

    if(status) {
        return jsonContatos
    } else {
        return status
    }
})

module.exports = {
    getContatoId,
    getContatoNumero
}