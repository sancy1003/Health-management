import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import MyRouter from './routes/Router';

import "./assets/css/reset.css";
import "./assets/css/main.css";

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
