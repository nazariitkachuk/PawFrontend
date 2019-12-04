import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment/Comment.js';
import "./CommentContainer.css";

export default class CommentContainer extends React.Component{

    render(){
        var commentsList = [<Comment />];

        return React.createElement("div", {class: "singleCommentWrapper"}, commentsList,
                    React.createElement("div", {class: "singleCommentWrapper"}, 
                        React.createElement("textarea", {type: "text", id: "newComment"}),
                        React.createElement("input", {type: "submit", value: "Add comment", id: "addNewCommentButton"})));
    }
}