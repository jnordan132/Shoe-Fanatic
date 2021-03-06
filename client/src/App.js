import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './utils/store';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import './pages/Signup-Login.css';
import Nike from './pages/Nike';
import Jordan from './pages/Jordan';
import Converse from './pages/Converse';
import Vans from './pages/Vans';
import Adidas from './pages/Adidas';
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
    
    <ApolloProvider client={client}>
      <Router>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/nike" component={Nike} />
              <Route exact path="/jordan" component={Jordan} />
              <Route exact path="/converse" component={Converse} />
              <Route exact path="/vans" component={Vans} />
              <Route exact path="/adidas" component={Adidas} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/page2" component={Page2} />
              <Route exact path="/page3" component={Page3} />
              <Route component={NoMatch} />
            </Switch>
          </Provider>
      </Router>
    </ApolloProvider>
    </div>
    
  );
}

export default App;
