import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StoresContainer from '../Stores/StoresContainer';
import TagsContainer from '../Tags/TagsContainer';
import LinkContainer from '../Link/LinkContainer';
import CategoriesContainer from '../Categories/CategoriesContainer';
import Login from '../Pages/Login';

export default function Routes() {


  return (
        <Switch>
            <Route path="/" exact  render={() => { return <div>Index page</div> }} />

            <Route path="/login" component={Login} />

            <Route path="/stores" component={StoresContainer} />
            <Route path="/stores/create" component={StoresContainer} />

            <Route path="/tags" component={TagsContainer} />
            <Route path="/categories" component={CategoriesContainer} />

            <Route path="/links/edit/:id" component={LinkContainer} />
            <Route path="/links/create" component={LinkContainer} />
            <Route path="/links" component={LinkContainer} />

            <Route render={ () => <div>Error 404</div> }  />
        </Switch>
  )
}
