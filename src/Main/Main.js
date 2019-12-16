import React from 'react';
import AddNewList from './AddNewList/AddNewList.js';
import "./Main.css";
import RESTrequests from '../RESTrequests.js';

export default class Main extends React.Component{

    id = this.props.id;
    
    render(){
        var lists = RESTrequests.getLists(this.id);

        console.log("Main: " + this.id);
        
        return React.createElement("div", {id: "Main"},
                    React.createElement("div", {id: "changeNameWrapper"},
                        React.createElement("input", {id: "changeNameInput", type: "text"}),
                        React.createElement("input", {id: "changeNameSubmitButton", type: "submit", 
                            value: "Change table name", 
                            onClick: () => RESTrequests.updateTableName(this.id, document.getElementById("changeNameInput").value)})), 
                    React.createElement("div", {id: "listWrapper"}, lists, <AddNewList id = {this.id} />));
    }
}