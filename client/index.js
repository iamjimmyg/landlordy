import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'
import './styles/app.scss'
import './images/favicon.ico'


const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/dashboard' component={requireAuth(Dashboard)} >
            <Route path='/dashboard/overview' component={requireAuth(Dashboard)} />
            <Route path='/dashboard/properties' component={requireAuth(Dashboard)} />
            <Route path='/dashboard/properties/:id' component={requireAuth(Dashboard)} />
            <Route path='/dashboard/tenants' component={requireAuth(Dashboard)} />
            <Route path='/dashboard/admin' component={requireAuth(Dashboard)} />
          </Route>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
