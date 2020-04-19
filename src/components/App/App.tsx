import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Search from '../Search/Search';
import DetailsPage from '../DetailsPage/DetailsPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/book/:id" component={DetailsPage} />
      </Switch>
    </div>
  );
}

export default App;
