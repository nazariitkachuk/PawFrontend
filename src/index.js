import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import MainContainer from './MainContainer/MainContainer.js';
import './index.css';
import RESTrequests from './RESTrequests.js';

var checkAuth = false;

if(document.cookie.includes('authorization')){
    var a = document.cookie.split(';');
    a.forEach(element =>{
        if(element.includes("authorization")){
            var b = element.split('=');
            checkAuth = RESTrequests.checkIfAuthOk(b[1]);
        }
    })
}else{
    RESTrequests.checkIfAuthOk("emptyCookies");
}

if(checkAuth){
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                var elements = [<Header />, React.createElement("div", {id: "popupContainer"}), <MainContainer />];
                ReactDOM.render(elements, document.getElementById("root"));
}
