import React from 'react';
import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Routes from './components/Routes';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </Provider>
    </div>
  );
}

export default App;
