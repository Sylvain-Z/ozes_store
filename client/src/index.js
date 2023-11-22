import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/App.css';
import './style/App-tablet.css';
import './style/App-laptop.css';
import './style/App-desktop.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

