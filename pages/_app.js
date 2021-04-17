import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import AppNavBar from "../components/shared/NavBar";
import Hero from "../components/shared/Hero";
import Footer from "../components/shared/Footer";

function MyApp({Component, pageProps}) {
    return <div className="portfolio-app">
        <AppNavBar/>
        {Component.name === 'Home' && <Hero/>}
        <div className="container">
            <Component {...pageProps} />
        </div>
        <Footer/>
    </div>
}

// MyApp.getInitialProps = async (context) => {
//     const initialProps = App.getInitialProps && await App.getInitialProps(context);
//     return {pageProps: { appData : 'Some testing data ', ...initialProps.pageProps}}
// }

export default MyApp
