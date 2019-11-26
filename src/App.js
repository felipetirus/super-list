import React from 'react'
import './App.css'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import Lists from './containers/Lists/Lists'
import Tasks from './containers/Tasks/Tasks'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/task" component={Tasks} />
        <Route path="/" exact component={Lists} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
