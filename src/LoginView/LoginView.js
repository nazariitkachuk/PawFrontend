import React from 'react';
import RESTrequests from '../RESTrequests.js'
import "./LoginView.css";

export default class LoginView extends React.Component{

    render(){
        return React.createElement("div", {class: "loginWrapper"},
                    React.createElement("input", {id: "inputEmail", class: "inputText input", type: "email", placeholder: "e-mail"}),
                    React.createElement("input", {id: "inputPassword", class: "inputText input", type: "text", placeholder: "password"}),
                    React.createElement("input", {id: "inputLogIn", class: "input", type: "button", 
                        value: "LogIn", onClick: () => RESTrequests.logIn(document.getElementById("inputEmail").value, 
                                                            document.getElementById("inputPassword").value)}))
    }
}