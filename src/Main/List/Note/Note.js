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
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

        var labelTable = RESTrequests.getTagsForCard(this.tableId, this.listId, this.id);
        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
                React.createElement("div", {class: "popup"},
                    React.createElement("lable", {class: "popupLabel"}, "Title: "), 
                    React.createElement("textarea", {id: "inputTitle", class: "popupInput", type: "text"}),
                    React.createElement("lable", {class: "popupLabel"}, "Content: "), 
                    React.createElement("textarea", {id: "inputContent", class: "popupInput", type: "text"}),
                    React.createElement("input", {class: "popupButton", value: "Change", type: "button", onClick: () => this.changeButtonPopup()}),
                    React.createElement("input", {class: "popupButton", value: "Cancel", type: "button", onClick: () => this.cancelButtonPopup()}),
                    React.createElement("div", {class: "cardLablesWrapper"},
                        React.createElement("div", {class: "labelsWrapper"},
                            labelTable),
                            React.createElement("input", {class: "addLabelToCard", 
                                value: "Add Label", type: "button", 
                                onClick: () => this.addLable(id, noteTitle, noteContent)}),
                            React.createElement("input", {class: "addLabelToCard", 
                                value: "Remove Label", type: "button", 
                                onClick: () => this.removeLable(id, noteTitle, noteContent)})
                    ))),
            document.getElementById('popupContainer')
        );

        document.getElementById('inputTitle').value = noteTitle;
        document.getElementById('inputContent').value = noteContent;
    }

    comments(){
        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
                React.createElement("div", {class: "popup"},
                    React.createElement("div", {class: "popupButton labelOnHover", onClick: () => this.cancelButtonPopup()}, "Back"),
                    React.createElement("div", {id: "commentsWrapper"}, 
                       <CommentContainer tableId = {this.tableId} listId = {this.listId} cardId = {this.id} />))
                ),
            document.getElementById('popupContainer')
        );
    }

    addLable(id, noteTitle, noteContent){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

        var labelTable = RESTrequests.getTags(this.tableId, this.listId, this.id, "add");
        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
            React.createElement("div", {class: "popupButton labelOnHover", onClick: () => this.editNote(id, noteTitle, noteContent)}, "Back"),
                React.createElement("div", {class: "popup"},
                    React.createElement("div", {class: "labelsWrapper"},
                        labelTable))),
            document.getElementById('popupContainer')
        );
    }

    removeLable(id, noteTitle, noteContent){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

        var labelTable = RESTrequests.getTagsForCard(this.tableId, this.listId, this.id, "remove");
        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
            React.createElement("div", {class: "popupButton labelOnHover", onClick: () => this.editNote(id, noteTitle, noteContent)}, "Back"),
                React.createElement("div", {class: "popup"},
                    React.createElement("div", {class: "labelsWrapper"},
                        labelTable))),
            document.getElementById('popupContainer')
        );
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

        var tags = RESTrequests.getTagsForCard(this.tableId, this.listId, this.id);
        return React.createElement("div", {class: "noteWrapper"},
                    React.createElement("div", {class: "noteTitle"},
                        React.createElement("div", {class: "tag"}, tags),
                        this.title,
                        React.createElement("div", {class: "deleteAndEditWrapper"},
                            React.createElement("label", {class: "noteEditLabel labelOnHover", 
                                onClick: () => this.editNote(this.id, this.title, this.content)}, "✎"),
                            React.createElement("label", {class: "noteEditLabel labelOnHover", 
                                onClick: () => this.comments()}, "✉️"),
                            React.createElement("label", {class: "noteDeleteLabel labelOnHover",
                                onClick: () => RESTrequests.deleteCard(this.tableId, this.listId, this.id)}, "X"),)),
                    React.createElement("div", {class: "noteContent"}, this.content));
    }
}