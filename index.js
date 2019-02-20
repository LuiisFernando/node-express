const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(saudacao('Luis'))



app.use((req, res, next) => {
    console.log('Antes')
    next()
})

app.get('/cliente/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo = ${req.query.completo} ano = ${req.query.ano}`)
})

//hard mode
app.post('/corpo', (req, res) => {

    //hard mode
    // let corpo = '';
    // req.on('data', function(parte) {
    //     corpo += parte
    // })

    // req.on('end', function() {
    //     res.send(corpo)
    // })

    // with body-parser
    // res.send(req.body.nome)
    res.send(req.body)
})




app.get('/cliente/:id', (req, res, next) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})

app.get('/opa', (req, res, next) => {
    console.log('Durante')    
    res.json({
        data: [
            { id: 1, name: 'dri', position: 1 },
            { id: 7, name: 'luis', position: 2 },
            { id: 54, name: 'joao', position: 3 }
        ],
        count: 30, // total de um registro 
        skip: 0,
        limit: 3,
        status: 200
    })

    // resposta retorna array de objeto
    // res.json([
    //     { id: 1, name: 'dri', position: 1 },
    //     { id: 7, name: 'luis', position: 2 },
    //     { id: 54, name: 'joao', position: 3 },
    // ])

    // resposta retorna objeto
    // res.json({
    //     name: 'ipad-32gb',
    //     price: 1899.00,
    //     discount: 0.12
    // })

    // respostas normais e html 
    // res.send('<h1>Boa!</h1>')

    next()
})

app.use((req, res) => {
    console.log('Depois')
})


// sera chamado apenas get
app.get('/ops', (req, res) => {
    res.status(200).send('My Backends!')
})

// sera chamado apenas post
app.post('/opss', (req, res) => {
    res.status(200).send('My Backends!')
})

app.all('/opsss', (req, res) => {
    res.status(200).send('My Backends!')
})

app.listen(3000, () => {
    console.log('Backend is running ...')
})