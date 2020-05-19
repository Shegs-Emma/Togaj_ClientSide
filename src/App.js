import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Landing from './containers/Landing/Landing';
import Gallery from './containers/Gallery/Gallery';
import PhotoData from './containers/PhotoData/PhotoData';
import Login from './containers/Login/Login';

const App = () => {
  let routes = (
    <Switch>
      <Route path="/gallery" component={Gallery} />
      <Route path="/login" component={Login} />
      <Route path="/photo" component={PhotoData} />
      <Route path="/" exact component={Landing} />
    </Switch>
  )
  return (
    <div className="App">
        {routes}
    </div>
  );
}

export default App;
