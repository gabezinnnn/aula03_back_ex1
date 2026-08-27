const express = require('express')
const pacientes = require('./dados.json')

let calcularIMC = () => {
    pacientes.forEach((paciente) => {
        paciente.imc = paciente.peso / (paciente.altura * paciente.altura)
    })
}


let listarPacientes = (req, res) => {
    calcularIMC()
    let mostrar = []
    pacientes.forEach( (paciente) => {
        mostrar.push(`${paciente.id} - ${paciente.data} - ${paciente.hora} - ${paciente.paciente} - ${paciente.peso} - ${paciente.altura} - ${paciente.imc.toFixed(2)} <br>`)
    })
    res.send(`${mostrar.join('')}`)
}

let cadastrarPacientes = (req, res) => {
    if (req.body){
        let paciente = req.body
        module.exports(paciente)
        res.send(`Consulta marcada com sucesso!`)
    }else{
        res.send(`Erro ao receber as informações`)
    }
}

const PORT = 3000
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/', listarPacientes)
app.post('/', cadastrarPacientes)

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
    console.log(`Site: http://127.0.0.1:5500/index.html`)
})