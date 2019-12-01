import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import TableList from './TableList/TableList.js';
import MainContainer from './MainContainer/MainContainer.js';
import LoginView from './LoginView/LoginView.js';
import Main from './Main/Main.js';
import List from './Main/List/List.js';
import Table from './TableList/Table/Table.js';
import Note from './Main/List/Note/Note.js';

export default class RESTrequests{

    static authorization = ""

    static logIn(email, password){
        var data = JSON.stringify({"email": email, "password": password})

        fetch("https://pawbackend.herokuapp.com/login",{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            RESTrequests.authorization = response.headers.get('Authorization');
            console.log(RESTrequests.authorization);
            response.json().then(result =>{
                if(result.httpCode === 200){
                    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                    var elements = [<Header />, React.createElement("div", {id: "popupContainer"}), <MainContainer />];
                    ReactDOM.render(elements, document.getElementById("root"));
                }else{
                    alert(result.message);
                }
            });
        });
    }

    static signUp(email, lastName, firstName, password){

        var data = JSON.stringify({"email": email, 
            "lastName": lastName, "firstName": firstName, "password": password});

        fetch('https://pawbackend.herokuapp.com/register', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json().then(result => {
            if(result.httpCode === 201){
                alert(result.message);
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                ReactDOM.render(<LoginView />, document.getElementById("root"));
            }else{
                alert(result.message);
            }
        }));
    }

    static addNewTable(tableName){
        if(tableName !== ""){
            var data = JSON.stringify({"name": tableName});

            fetch('https://pawbackend.herokuapp.com/table', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            });
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
    }

    static updateTableName(tableId, tableNewName){
        if(tableNewName !== ""){
            var data = JSON.stringify({"tableId": tableId, "name": tableNewName});

            // fetch('https://pawbackend.herokuapp.com/table/' + tableId, {
            //     method: 'PUT',
            //     body: data,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': RESTrequests.authorization
            //     }
            // });

            var request = new XMLHttpRequest();
            request.open('PUT', 'https://pawbackend.herokuapp.com/table/' + tableId, false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', RESTrequests.authorization);

            request.send(data);
            
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
    }

    static addNewList(tableId, listName){
        if(listName !== ""){
            var data = JSON.stringify({"name": listName});

            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            });

            var request = new XMLHttpRequest();
        }

        if(document.getElementById("Main")){
            ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
        }
        ReactDOM.render(<Main />, document.getElementById("MainContainer"));
    }

    static getTables(){

        var tables = [];

        // fetch('https://pawbackend.herokuapp.com/table', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': RESTrequests.authorization
        //     }
        // }).then(response => response.json().then(result => {
        //     console.log(result);
        //     result.forEach(element => {
        //         tables.push(<Table id = {element.tableId} name = {element.name} />)
        //     });
        //     return tables;
        // }));

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);

        request.onload = function(){
            var data = JSON.parse(this.responseText);
            
            data.forEach(element => {
                tables.push(<Table id = {element.tableId} name = {element.name} />)
            });
        };

        request.send();

        return tables;
    }

    static getLists(tableId){

        var lists = [];

        // fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': RESTrequests.authorization
        //     }
        // }).then(response => response.json().then(result => {
        //     result.forEach(element => {
        //         lists.push(<List id = {element.id} name = {element.name} />)
        //     });
        //     return lists;
        // }))

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/'+tableId+'/list', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                console.log(element);
                lists.push(<List tableId = {tableId} id = {element.listId} name = {element.name} />)
            });
        }

        request.send();

        return lists;
    }

    static getCards(tableId, listId){
        var cards = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText);

            data.forEach(element => {
                console.log(element);
                cards.push(<Note tableId = {tableId} listId = {listId} id = {element.cardId}  title = {element.name} content = {element.description}/>);
            });
        }

        request.send();

        return cards;
    }
}