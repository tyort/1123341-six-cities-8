import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const places: string[] = ['Apartment', 'House', 'Bungalo', 'Room', 'Street'];

ReactDOM.render(
  <React.StrictMode>
    <App
      places = {places}
    />
  </React.StrictMode>,
  document.getElementById('root'));

