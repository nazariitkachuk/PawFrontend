import React from 'react';
import Note from './Note/Note.js';
import AddNode from './AddNode/AddNode.js';
import "./List.css";
import RESTrequests from '../../RESTrequests.js';

export default class List extends React.Component{
    
    tableId = this.props.tableId;
    id = this.props.id;
    name = this.props.name;

    render(){
        var table = RESTrequests.getCards(this.tableId, this.id)
        
        return React.createElement("div", {class: "listWrapper"}, 
                    React.createElement("div", {class: "listTitle"}, this.name),
                    React.createElement("div", {class: "listContent"}, table),
                    <AddNode tableId = {this.tableId} listId = {this.id} />);
    }
}