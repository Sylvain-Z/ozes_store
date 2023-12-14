import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/App.scss';
import './style/App-tablet.scss';
import './style/App-laptop.scss';
import './style/App-desktop.scss';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KZ14jEfmPG1927KJEU93zmkBvNwPZDnnUyyOeXwUDf9IlRdB5PnUIHNOAkrAynPHlMsS59K1KE1aOBwL7WATthu00jFvlpkkw'); // clé publique de stripe mode test

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <App />
    </Provider>
  </Elements>
);

