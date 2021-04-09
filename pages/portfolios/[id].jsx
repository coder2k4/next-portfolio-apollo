// import {useRouter} from "next/router";
//
// const PortfolioDetail = () => {
//
//     const router = useRouter()
//     const id = router.query.id
//
//
//     return (
//         <div>
//             im on detail page: {id}
//         </div>
//     );
// };
//
// export default PortfolioDetail;


import React, {Component} from 'react';

class PortfolioDetail extends Component {

    static getInitialProps({query}) {
        return {query}
    }

    render() {
        const id = this.props.query.id
        return (
            <div>
                im on detail page: {id}
            </div>
        );
    }
}

export default PortfolioDetail;