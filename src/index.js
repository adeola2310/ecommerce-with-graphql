import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Apollo makes sure to cache the data that is fetched
import {ApolloProvider} from "react-apollo";

// this allows us connects clients to specific endpoint
import {createHttpLink} from "apollo-link-http";

// apollo uses this to cache the data
import {InMemoryCache} from "apollo-cache-inmemory";

import {ApolloClient, gql} from "apollo-boost";
import {store, persistor} from './redux/store';

import './index.css';
import App from './App';


const httpLink = createHttpLink({
    uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache;

const client = new ApolloClient({
    link: httpLink,
    cache
})
client.query({
    query: gql`
    {
     getCollectionsByTitle(title: "hats"){
    id
    title
    items{
      id
      name
      price
      imageUrl
    }
  }
    }
    `
}).then(
    res=>{
        console.log(res);
    }
)

ReactDOM.render(
    <ApolloClient client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloClient>
    ,
    document.getElementById('root')
);
