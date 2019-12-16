import React from 'react';
import ReactDOM from 'react-dom';
import "./Comment.css";
import RESTrequests from '../../../../../RESTrequests';

export default class Comment extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    cardId = this.props.cardId;
    id = this.props.id;
    user = this.props.user;
    content = this.props.content;

    render(){

        this.tableId = this.props.tableId;
        this.listId = this.props.listId;
        this.cardId = this.props.cardId;
        this.id = this.props.id;
        this.user = this.props.user;
        this.content = this.props.content;

        return React.createElement("div", {class: "commentWrapper"},
                    React.createElement("label", {id: "userLabel"}, this.user + ":"),
                    React.createElement("input", {type: "button", value: "Delete", class: "cardButtons",
                        onClick: () => RESTrequests.deleteComment(this.tableId, this.listId, this.cardId, this.id)}),
                    React.createElement("input", {type: "button", value: "Save", class: "cardButtons",
                        onClick: () => RESTrequests.editComment(this.tableId, this.listId, this.cardId, this.id, 
                            document.getElementById("commentContent").value)}),
                    React.createElement("textarea", {type: "text", id: "commentContent"}, this.content));
    }
}