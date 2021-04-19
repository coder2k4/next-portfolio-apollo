const express = require('express')
const next = require('next')
const Portfolio = require("./graphql/models/Portfolio");
const portfolio = require("./database/models/portfolio");
const mongoose = require("mongoose");
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");
const {ApolloServer, gql} = require("apollo-server-express")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const {portfolioQueries, portfolioMutations} = require('./graphql/resolvers')
const {portfolioTypes} = require('./graphql/types')


require('./database').connect();

app.prepare().then(() => {
    const server = express()

    const apolloServer = require("./graphql").createApolloServer()

    apolloServer.applyMiddleware({app: server})

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})