const express = require('express')
const next = require('next')
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");
const { ApolloServer, gql} = require("apollo-server-express")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const {portfolioQueryResolvers , portfolioMutationResolvers} = require('./graphql/resolvers')
const {portfolioTypes} = require('./graphql/types')


app.prepare().then(() => {
    const server = express()

    const typeDefs = `
        ${portfolioTypes}

        type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
            removePortfolio(id: ID) : String
        }        
    `

    const resolvers = {
        Query : {
            ...portfolioQueryResolvers
        },
        Mutation : {
            ...portfolioMutationResolvers
        }

    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    apolloServer.applyMiddleware({app: server})

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})