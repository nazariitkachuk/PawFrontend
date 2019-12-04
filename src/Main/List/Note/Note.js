import React from 'react';
import ReactDOM from 'react-dom';
import CommentContainer from './CommentContainer/CommentContainer.js';
import "./Note.css";
import RESTrequests from '../../../RESTrequests';

export default class Note extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    id = this.props.id;
    title = this.props.title;
    content = this.props.content;

    editNote(id, noteTitle, noteContent){

        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
                React.createElement("div", {class: "popup"},
                    React.createElement("lable", {class: "popupLabel"}, "Title: "), 
                    React.createElement("textarea", {id: "inputTitle", class: "popupInput", type: "text"}),
                    React.createElement("lable", {class: "popupLabel"}, "Content: "), 
                    React.createElement("textarea", {id: "inputContent", class: "popupInput", type: "text"}),
                    React.createElement("input", {class: "popupButton", value: "Change", type: "button", onClick: () => this.changeButtonPopup()}),
                    React.createElement("input", {class: "popupButton", value: "Cancel", type: "button", onClick: () => this.cancelButtonPopup()}),
                    React.createElement("div", {id: "commentsWrapper"}, <CommentContainer />))),
            document.getElementById('popupContainer')
        );

        document.getElementById('inputTitle').value = noteTitle;
        document.getElementById('inputContent').value = noteContent;
    }

    cancelButtonPopup(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));
    }

    changeButtonPopup(){
        RESTrequests.editCard(this.tableId, this.listId, 
            this.id, document.getElementById("inputTitle").value,
            document.getElementById("inputContent").value);
    }

    render(){

        this.tableId = this.props.tableId;
        this.listId = this.props.listId;
        this.id = this.props.id;
        this.title = this.props.title;
        this.content = this.props.content;

        return React.createElement("div", {class: "noteWrapper"}, 
                    React.createElement("div", {class: "noteTitle"}, this.title,
                        React.createElement("div", {class: "deleteAndEditWrapper"},
                            React.createElement("label", {class: "noteDeleteLabel labelOnHover",
                                onClick: () => RESTrequests.deleteCard(this.tableId, this.listId, this.id)}, "X"),
                            React.createElement("br", null, null),
                            React.createElement("label", {class: "noteEditLabel labelOnHover", 
                                onClick: () => this.editNote(this.id, this.title, this.content)}, "✎"))),
                    React.createElement("div", {class: "noteContent"}, this.content));
    }
}