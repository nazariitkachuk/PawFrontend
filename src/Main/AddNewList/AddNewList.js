import React from 'react';
import './AddNewList.css';
import RESTrequests from '../../RESTrequests.js';


export default class AddNewList extends React.Component{

    id = this.props.id;

    render(){
        return React.createElement("div", {class: "addNewList"},
                    React.createElement("input", {type: "text", id: "newListNameInput"}),
                    React.createElement("input", {type: "submit", value: "Add", 
                        id: "newListNameSubmitButton", onClick: () => RESTrequests.addNewList(this.id, document.getElementById("newListNameInput").value)}));
    }
}