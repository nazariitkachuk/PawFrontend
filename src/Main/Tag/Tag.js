import React from 'react';
import './Tag.css';
import RESTrequests from '../../RESTrequests';

export default class Tag extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    cardId =  this.props.cardId;
    id = this.props.id;
    mode = this.props.mode;

    render(){

        this.tableId = this.props.tableId;
        this.listId = this.props.listId;
        this.cardId =  this.props.cardId;
        this.id = this.props.id;
        this.mode = this.props.mode;

        if(this.mode === "add"){
            return React.createElement("div", {class: "labelWrapper"},
                        React.createElement("div", {class: "labelColor", id: "labelColor" + this.props.id, 
                            style: {backgroundColor: this.props.color}, 
                            onClick: () => RESTrequests.addTagToCard(this.tableId, this.listId,
                                    this.cardId, this.id)}, this.props.content));
        }

        if(this.mode === "remove"){
            return React.createElement("div", {class: "labelWrapper"},
                        React.createElement("div", {class: "labelColor", id: "labelColor" + this.props.id, 
                            style: {backgroundColor: this.props.color}, 
                            onClick: () => RESTrequests.removeTagFromCard(this.tableId, this.listId,
                                    this.cardId, this.id)}, this.props.content));
        }

        if(this.mode === "newName"){
            return React.createElement("div", {class: "labelWrapper"},
            React.createElement("div", {class: "labelColor", id: "labelColor" + this.props.id, 
                style: {backgroundColor: this.props.color}, 
                onClick: () => RESTrequests.newName(this.tableId, this.id,
                    document.getElementById("labelNewName").value)}, 
                this.props.content));
        }

        return React.createElement("div", {class: "labelWrapper"},
                        React.createElement("div", {class: "labelColor", id: "labelColor" + this.props.id, 
                            style: {backgroundColor: this.props.color}},
                            this.props.content));
    }
}