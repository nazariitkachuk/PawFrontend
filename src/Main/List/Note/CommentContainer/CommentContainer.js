import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment/Comment.js';
import "./CommentContainer.css";
import RESTrequests from '../../../../RESTrequests.js';

export default class CommentContainer extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    cardId = this.props.cardId;

    render(){
        var commentsList = RESTrequests.getComments(this.tableId, this.listId, this.cardId);

        return React.createElement("div", {class: "singleCommentWrapper"}, commentsList,
                    React.createElement("div", {class: "singleCommentWrapper"},
                        React.createElement("textarea", {type: "text", id: "newComment"}),
                        React.createElement("input", 
                            {type: "button", value: "Add comment", id: "addNewCommentButton",
                            onClick: () => RESTrequests.addNewComments(this.tableId, 
                                this.listId, this.cardId, 
                                    document.getElementById("newComment").value)})));
    }
}