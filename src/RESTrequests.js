import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import MainContainer from './MainContainer/MainContainer.js'

export default class RESTrequests{
    
    cookie;

    static logIn(email, password){
        var request = new XMLHttpRequest();
        request.open('POST', 'https://pawbackend.herokuapp.com/login', false);
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.onload = function() {
            var data = JSON.parse(this.response);
            console.log("cookie: " + data.access_token);
            if(data.httpCode == 200){
        
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                var elements = [<Header />, <MainContainer />];
                ReactDOM.render(elements, document.getElementById("root"));
            }else {
                alert(data.message)
            }
        };
        var data = JSON.stringify({"email": email, "password": password});
        console.log("JSON " + data);
        request.send(data);
    }
}