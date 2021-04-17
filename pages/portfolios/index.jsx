import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import withApollo from "../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import {useCreatePortfolio, useDeletePortfolio, useGetPortfolios, useUpdatePortfolio} from "../../apollo/actions";


const Portfolios = () => {
    const { data } = useGetPortfolios();
    const [ updatePortfolio ] = useUpdatePortfolio();
    const [ deletePortfolio ] = useDeletePortfolio();
    const [ createPortfolio ] = useCreatePortfolio();

    const portfolios = data && data.portfolios || [];
    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
                <button
                    onClick={createPortfolio}
                    className="btn btn-primary">Create Portfolio</button>
            </section>
            <section className="pb-5">
                <div className="row">
                    { portfolios.map(portfolio =>
                        <div key={portfolio._id} className="col-md-4">
                            <Link
                                href='/portfolios/[id]'
                                as={`/portfolios/${portfolio._id}`}>
                                <a className="card-link">
                                    <PortfolioCard portfolio={portfolio} />
                                </a>
                            </Link>
                            <button
                                className="btn btn-warning"
                                onClick={() => updatePortfolio({variables: {id: portfolio._id}})}>Update Portfolio</button>
                            <button
                                onClick={() => deletePortfolio({variables: {id: portfolio._id}})}
                                className="btn btn-danger">
                                Delete Portfolio
                            </button>
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    )
}

// Portfolios.getInitialProps = async () => {
//     const portfolios = await fetchPortfolios()
//     return {data: portfolios}
// }
//
// export async function getServerSideProps(){
//     const { data } = await client.query({query: GET_PORTFOLIOS})
//
//     const testServerSide = () => {
//         console.log('im on server query')
//     }
//     return {
//         props: {
//             portfolios: data.portfolios,
//             testServerSide
//         },
//     }
// }


export default withApollo(Portfolios, {getDataFromTree})