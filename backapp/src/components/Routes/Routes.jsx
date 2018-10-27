import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

export default function Routes() {
  return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => { return <div>Index page</div> }} />
                <Route render={ () => <div>Error 404</div> }  />
            </Switch>
        </BrowserRouter>
  )
}
