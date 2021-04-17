import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import withApollo from "next-with-apollo";


export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: 'http://localhost:3000/graphql',
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);