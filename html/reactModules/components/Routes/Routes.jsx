import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Index from '../../pages/Index'
import Catalog from '../../pages/Catalog'
import Error from '../../pages/Error'

export default function Routes() {
  return (
    <React.Fragment>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/catalog" component={Catalog} />
            <Route component={Error} />
        </Switch> 
    </React.Fragment>
  )
}
