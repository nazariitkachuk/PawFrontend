import React from 'react';
import RESTrequests from '../../RESTrequests'
import "./AddNewTable.css";

export default class AddNewTable extends React.Component{
    
    render(){
        return  React.createElement("div", {class: "addNewTable"},
                    React.createElement("input", {type: "text", id: "newTableNameInput"}),
                    React.createElement("input", {type: "submit", value: "Add", id: "newTableNameSubmitButton", 
                        onClick: () => RESTrequests.addNewTable(document.getElementById("newTableNameInput").value)}));
    }
}