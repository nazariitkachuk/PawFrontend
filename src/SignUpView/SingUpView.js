import React from 'react';
import ReactDOM from 'react-dom';
import RESTrequests from '../RESTrequests.js';
import LoginView from '../LoginView/LoginView.js';
import './SignUpView.css';

export default class SingUp extends React.Component{

    logIn(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
        ReactDOM.render(<LoginView />, document.getElementById("root"));
    }

    render(){
        return React.createElement("div", {class: "signUpWrapper"},
                    React.createElement("input", {id: "inputEmail", class: "inputText input", type: "email", placeholder: "e-mail"}),
                    React.createElement("input", {id: "inputLastName", class: "inputText input", type: "text", placeholder: "last name"}),
                    React.createElement("input", {id: "inputFirstName", class: "inputText input", type: "text", placeholder: "first name"}),
                    React.createElement("input", {id: "inputPassword", class: "inputText input", type: "text", placeholder: "password"}),
                    React.createElement("input", {id: "inputSignUp", class: "input", type: "button", 
                        value: "SignUp", onClick: () => RESTrequests.signUp(
                                                            document.getElementById("inputEmail").value,
                                                            document.getElementById("inputLastName").value,
                                                            document.getElementById("inputFirstName").value, 
                                                            document.getElementById("inputPassword").value)}),
                    React.createElement("label", {id: "labelLogIn", onClick: () => this.logIn()}, "LogIn"),)
    }
}