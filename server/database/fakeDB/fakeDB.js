const Portfolio = require("../models/portfolio")
const {portfolios} = require("./data")

class FakeDb {


    async clean() {
        await Portfolio.deleteMany({})
    }

    async addData() {
        await Portfolio.create(portfolios)
    }

    async populate() {
        await this.clean()
        await this.addData()
    }
}

module.exports = new FakeDb();