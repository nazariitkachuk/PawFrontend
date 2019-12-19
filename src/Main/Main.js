import React from 'react';
import ReactDOM from 'react-dom';
import AddNewList from './AddNewList/AddNewList.js';
import "./Main.css";
import RESTrequests from '../RESTrequests.js';
import Tag from './Tag/Tag.js';

export default class Main extends React.Component{

    id = this.props.id;

    archive(){
        var lists = RESTrequests.getListsArch(this.id);

        console.log("Main: " + this.id);
        
        ReactDOM.unmountComponentAtNode(document.getElementById("MainContainer"));
    
        ReactDOM.render(
            React.createElement("div", {id: "Main"},
                        React.createElement("div", {id: "listWrapper"},
                            React.createElement("div", {class: "listContent"}, lists))),
                        document.getElementById("MainContainer")
        );
    }
    
    labelsPopup(){
        var labelTable = RESTrequests.getTags(this.id, undefined, undefined, "newName");
        ReactDOM.render(
            React.createElement("form", {class: "popupWrapper"},
            React.createElement("div", {class: "popupButton labelOnHover", onClick: () => this.cancelButtonPopup()}, "Back"),
                React.createElement("div", {class: "popup"},
                    React.createElement("div", {class: "labelsWrapper"},
                        labelTable),
                    React.createElement("div", {class: "newLabelWrapper"},
                        React.createElement("input", {id: "labelNewName", class: "labelPopupText", type: "text", placeholder: "text"})))),     
            document.getElementById('popupContainer')
        );
    }

    cancelButtonPopup(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));
    }

    render(){
        var lists = RESTrequests.getLists(this.id);

        console.log("Main: " + this.id);
        
        return React.createElement("div", {id: "Main"},
                    React.createElement("div", {id: "changeNameWrapper"},
                        React.createElement("input", {id: "changeNameInput", type: "text"}),
                        React.createElement("input", {id: "changeNameSubmitButton", type: "submit", 
                            value: "Change table name", 
                            onClick: () => RESTrequests.updateTableName(this.id, document.getElementById("changeNameInput").value)}),
                            React.createElement("input", {id: "labelsButton", type: "submit", 
                            value: "Labels", 
                            onClick: () => this.labelsPopup()})),
                            React.createElement("input", {id: "archive", type: "submit", 
                            value: "Archive", 
                            onClick: () => this.archive()}), 
                    React.createElement("div", {id: "listWrapper"}, lists, <AddNewList id = {this.id} />));
    }
}