const portfolios = [
    {
        id: 'aaa',
        title: 'Job in Netcentric',
        company: 'Netcentric',
        companyWebsite: 'www.google.com',
        location: 'Spain, Barcelona',
        jobTitle: 'Engineer',
        description: 'Doing something, programing....',
        startDate: '01/01/2014',
        endDate: '01/01/2016',
    },
    {
        id: 'bbb',
        title: 'Job in Siemens',
        company: 'Siemens',
        companyWebsite: 'www.google.com',
        location: 'Slovakia, Kosice',
        jobTitle: 'Software Engineer',
        description: 'Responsoble for parsing framework for JSON medical data.',
        startDate: '01/01/2011',
        endDate: '01/01/2013',
    },
    {
        id: 'ccc',
        title: 'Work in USA',
        company: 'WhoKnows',
        companyWebsite: 'www.google.com',
        location: 'USA, Montana',
        jobTitle: 'Housekeeping',
        description: 'So much responsibility....Overloaaaaaad',
        startDate: '01/01/2010',
        endDate: '01/01/2011',
    }
]

exports.portfolioResolvers = {
    portfolio: (args) => portfolios.find(portfolio => portfolio.id == args.id),
    portfolios: () => portfolios,
    createPortfolio: ({input}) => {
        console.log(input)
        const _id = require('crypto').randomBytes(10).toString('hex')
        const newPortfolio = {...input}
        newPortfolio.id = _id
        portfolios.push(newPortfolio)
        return newPortfolio
    }
}