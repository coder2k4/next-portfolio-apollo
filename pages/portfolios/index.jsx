import axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import {useState} from "react";

const fetchPortfolios = async () => {
    const query = `
            query Portfolios {
              portfolios {
                id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
              }
            }
        `

    const data = await axios.post('http://localhost:3000/graphql', {query})
    return data.data.data.portfolios
}

const Portfolios = ({data}) => {

    const [portfolios, setPortfolios] = useState(data)

    const portfolioCards = portfolios.map(portfolio => {
            return (
                <div className="col-md-4" key={portfolio.id}>
                    <Link href="/portfolios/[id]" as={`/portfolios/${portfolio.id}`}>
                        <a className="card-link">
                            <PortfolioCard portfolio={portfolio}/>
                        </a>
                    </Link>
                </div>
            )
        }
    )

    async function createPortfolio() {
        const query = `
            mutation CreatePortfolio {
                createPortfolio ( input: {
                    title: "title"
                    company: "company"
                    companyWebsite: "companyWebsite"
                    location: "location"
                    jobTitle: "jobTitle"
                    description: "description"
                    startDate: "startDate"
                    endDate: "endDate"                
                }) 
                {
                  id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
                }
            }
        `

        const data = await axios.post('http://localhost:3000/graphql', {query})
        setPortfolios([...portfolios, data.data.data.createPortfolio])
    }

    return <>
        {/* HOME PAGE STARTS */}
        <section className="section-title">
            <div className="px-2">
                <div className="pt-5 pb-4">
                    <h1>Portfolios</h1>
                </div>
            </div>
            <button className="btn btn-primary" onClick={createPortfolio}>Create Portfolio</button>
        </section>
        <section className="pb-5">
            <div className="row">
                {portfolioCards}
            </div>
        </section>
        <a href="" className="btn btn-main bg-blue ttu">See More Portfolios</a>
    </>
}

Portfolios.getInitialProps = async () => {
    const portfolios = await fetchPortfolios()
    return {data: portfolios}
}


export default Portfolios