const express = require('express')
const next = require('next')
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()


app.prepare().then(() => {
    const server = express()

    // Подключаем graphql к нашему серверу
    const schema = buildSchema(`
        type Query {
        hello: String
        }
    `)

    // Resolver для наших запросов
    const root = {
        hello: () => 'Hello from resolver!'
    }

    server.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true  // отображает "песочицу"
    }))

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})