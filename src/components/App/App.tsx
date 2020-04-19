import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './App.css';
import Search from '../Search/Search';
import DetailsPage from '../DetailsPage/DetailsPage';

function App() {
  return (
    <div className="App">
      <header className="mb-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Google Books
          </Link>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/book/:id" component={DetailsPage} />
      </Switch>
    </div>
  );
}

export default App;
