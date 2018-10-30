import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StoresContainer from '../Stores/StoresContainer';

export default function Routes() {
  return (
        <Switch>
            <Route path="/" exact  render={() => { return <div>Index page</div> }} />
            <Route path="/stores" component={StoresContainer} />
            <Route path="/stores/create" component={StoresContainer} />
            <Route render={ () => <div>Error 404</div> }  />
        </Switch>
  )
}
