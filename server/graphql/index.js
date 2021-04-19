const {gql} = require("@apollo/client");
const Portfolio = require("./models/Portfolio");
const portfolio = require("../database/models/portfolio");
const User = require("./models/User");
const {ApolloServer} = require("apollo-server-express");
const {portfolioMutations, userMutations, portfolioQueries} = require("./resolvers");
const {portfolioTypes} = require("./types");


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
        
        signIn: String
        signUp: String
        signOut: String        
      }       
    `

    const resolvers = {
        Query: {
            ...portfolioQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations,
        }

    }

    return new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            models: {
                Portfolio: new Portfolio(portfolio),
                User: new User()
            }
        })
    })
}