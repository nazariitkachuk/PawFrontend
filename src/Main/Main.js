import React from 'react';
import AddNewList from './AddNewList/AddNewList.js';
import List from './List/List.js';
import "./Main.css";
import RESTrequests from '../RESTrequests.js';

export default class Main extends React.Component{

    id = this.props.id;
    
    render(){
        var tables = [];

        tables = [<List id = "0" name = "ListMock0" />,
                    <List id = "1" name = "ListMock1" />,
                    <List id = "2" name = "ListMock2" />]

        // var request = new XMLHttpRequest();
        // request.open('GET', 'https://pawbackend.herokuapp.com/table/'+this.id+'/list', false);

        // request.onload = function(){
        //     var data = JSON.parse(this.responseText)

        //     data.forEach(element => {
        //         tables.push(<List id = {element.id} name = {element.name} />)
        //     });
        //     console.log(tables);
        // }

        // request.send();
        
        return React.createElement("div", {id: "Main"},
                    React.createElement("div", {id: "changeNameWrapper"},
                        React.createElement("input", {id: "changeNameInput", type: "text"}),
                        React.createElement("input", {id: "changeNameSubmitButton", type: "submit", 
                            value: "Change table name", 
                            onClick: () => RESTrequests.updateTableName(this.id, document.getElementById("changeNameInput").value)})), 
                    React.createElement("div", {id: "listWrapper"}, tables, <AddNewList id = {this.id} />));
    }
}