import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import { conn } from './connection';
import { FlureeProvider } from 'fql-react';

const App = () => (
  <FlureeProvider conn={conn}>
    <Router routes={routes} history={hashHistory} />
  </FlureeProvider>
);

ReactDOM.render(
  <App />, document.getElementById('root')
);
