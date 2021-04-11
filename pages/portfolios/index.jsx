import axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";

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

const Portfolios = ({portfolios}) => {

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

    return <>
        {/* HOME PAGE STARTS */}
        <section className="section-title">
            <div className="px-2">
                <div className="pt-5 pb-4">
                    <h1>Portfolios</h1>
                </div>
            </div>
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
    return {portfolios}
}


export default Portfolios