exports.portfolioTypes = `
        type Portfolio {
        id: ID
        title: String
        company: String
        companyWebsite: String
        location: String
        jobTitle: String
        description: String
        startDate: String
        endDate: String
    }
    
    input PortfolioInput {
        title: String
        company: String
        companyWebsite: String
        location: String
        jobTitle: String
        description: String
        startDate: String
        endDate: String
    }
    

    type Query {
        portfolio(id:ID) : Portfolio,
            portfolios: [Portfolio],
    }
`

