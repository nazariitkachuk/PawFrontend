import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import MainContainer from './MainContainer/MainContainer.js'
import './index.css';

var elements = [<Header />, <MainContainer />];

ReactDOM.render(
elements,
    document.getElementById('root')
);