import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import PacksCalculator from './components/packs-calculator';

function App() {
  return (
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css?family=Bebas Neue" rel="stylesheet"/> 
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/> 
      </head>
      <Header/>

      <PacksCalculator/>
    </div>
  );
}

export default App;
