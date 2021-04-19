const Portfolio = require("./models/Portfolio");
const portfolio = require("../database/models/portfolio");
const {ApolloServer} = require("apollo-server-express");
const {portfolioMutations} = require("./resolvers");
const {portfolioQueries} = require("./resolvers");
const {portfolioTypes} = require("./types");
const {gql} = require("@apollo/client");


exports.createApolloServer = () => {

    const typeDefs = gql`
        ${portfolioTypes}

      type Query {
        hello: String
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
      }

      type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
        updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        deletePortfolio(id: ID): ID
      }       
    `

    const resolvers = {
        Query: {
            ...portfolioQueries
        },
        Mutation: {
            ...portfolioMutations
        }

    }

    return new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            models: {
                Portfolio: new Portfolio(portfolio)
            }
        })
    })
}