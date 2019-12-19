import React from 'react';
import ReactDOM from 'react-dom';
import CommentContainer from './CommentContainer/CommentContainer.js';
import "./Note.css";
import RESTrequests from '../../../RESTrequests';
import Dropzone from 'react-dropzone';


export default class Note extends React.Component{

    tableId = this.props.tableId;
    listId = this.props.listId;
    id = this.props.id;
    title = this.props.title;
    content = this.props.content;
    filename = this.props.filename;
    file = this.props.file;
    attachmentId = this.props.attachmentId;

    editNote(id, noteTitle, noteContent){

        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
                React.createElement("div", {class: "popup"},
                    React.createElement("lable", {class: "popupLabel"}, "Title: "), 
                    React.createElement("textarea", {id: "inputTitle", class: "popupInput", type: "text"}),
                    React.createElement("lable", {class: "popupLabel"}, "Content: "), 
                    React.createElement("textarea", {id: "inputContent", class: "popupInput", type: "text"}),
                    React.createElement("input", {class: "popupButton", value: "Change", type: "button", onClick: () => this.changeButtonPopup()}),
                    React.createElement("input", {class: "popupButton", value: "Cancel", type: "button", onClick: () => this.cancelButtonPopup()}))),
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

    cancelButtonPopup(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));
    }

    changeButtonPopup(){
        RESTrequests.editCard(this.tableId, this.listId, 
            this.id, document.getElementById("inputTitle").value,
            document.getElementById("inputContent").value);
    }

    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        RESTrequests.addAttachment(this.tableId,this.listId,this.id,this.filename,this.file);
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
                            React.createElement("label", {class: "noteEditLabel labelOnHover", 
                                onClick: () => this.editNote(this.id, this.title, this.content)}, "✎"),
                            React.createElement("label", {class: "noteEditLabel labelOnHover", 
                                onClick: () => this.comments()}, "✉️"),
                            React.createElement("label", {class: "noteDeleteLabel labelOnHover",
                                onClick: () => RESTrequests.deleteCard(this.tableId, this.listId, this.id)}, "X"),)),

            <div className="text-center mt-5">
                <Dropzone onDrop={this.onDrop}
                multiple={false}
                >
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            Upload File
                        </div>
                    )}
                </Dropzone>
            </div>,
            React.createElement("label", {class: "noteEditLabel labelOnHover",
                onClick: () => RESTrequests.deleteAttachment(this.tableId, this.listId, this.id,this.attachmentId)}, "Delete File"),
                    React.createElement("div", {class: "noteContent"}, this.content));
    }
}