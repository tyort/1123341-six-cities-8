import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';

const places: string[] = ['Apartment', 'House', 'Bungalo', 'Room', 'Street'];

ReactDOM.render(
  <React.StrictMode>
    <App
      places = {places}
      offers = {offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));

