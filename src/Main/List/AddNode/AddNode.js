import React from 'react';
import './AddNode.css';
import RESTrequests from '../../../RESTrequests';

export default class AddNode extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    
    render(){
        return React.createElement("div", {class: "addNewNodeWrapper"},
                    React.createElement("input", {type: "text", id: "newNodeTitleInput"}),
                    React.createElement("input", {type: "submit", value: "Add", id: "newNodeAddButton", 
                        onClick: () => RESTrequests.addNewCard(this.tableId, this.listId, document.getElementById("newNodeTitleInput").value) }));
    }
}