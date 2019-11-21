import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import TableList from './TableList/TableList.js';
import MainContainer from './MainContainer/MainContainer.js';
import LoginView from './LoginView/LoginView.js';
import Main from './Main/Main.js';

export default class RESTrequests{

    static logIn(email, password){
        var request = new XMLHttpRequest();
        request.open('POST', 'https://pawbackend.herokuapp.com/login', false);
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.onload = function() {
            var data = JSON.parse(this.response);
            console.log("cookie: " + data.access_token);
            if(data.httpCode === 200){
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                var elements = [<Header />, React.createElement("div", {id: "popupContainer"}), <MainContainer />];
                ReactDOM.render(elements, document.getElementById("root"));
            }else {
                alert(data.message);
            }
        };
        var data = JSON.stringify({"email": email, "password": password});
        console.log("JSON " + data);
        request.send(data);
    }

    static signUp(email, lastName, firstName, password){
        var request = new XMLHttpRequest();
        request.open('POST', 'https://pawbackend.herokuapp.com/register', false);
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.onload = function() {
            var data = JSON.parse(this.response);
            if(data.httpCode === 201){
                alert(data.message);
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                ReactDOM.render(<LoginView />, document.getElementById("root"));
            }else {
                alert(data.message);
            }
        };
        var data = JSON.stringify({"email": email, "lastName": lastName, "firstName": firstName, "password": password});
        console.log("JSON " + data);
        request.send(data);
    }

    static addNewTable(tableName){
        if(tableName !== ""){
            var request = new XMLHttpRequest();
            request.open('POST', 'https://pawbackend.herokuapp.com/table', false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"name\":\"" + tableName + "\"}");
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
    }

    static updateTableName(tableId, tableNewName){
        if(tableNewName !== ""){
            var request = new XMLHttpRequest();
            request.open('PUT', 'https://pawbackend.herokuapp.com/table/' + tableId, false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"id\":\"" + tableId + "\", \"name\":\"" + tableNewName + "\"}");
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
    }

    static addNewList(tableId, listName){
        if(listName !== ""){
            var request = new XMLHttpRequest();
            request.open('POST', 'https://pawbackend.herokuapp.com/table/' + tableId + '/list' , false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"name\":\"" + listName + "\"}");
        }

        if(document.getElementById("Main")){
            ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
        }
        ReactDOM.render(<Main />, document.getElementById("MainContainer"));
    }
}