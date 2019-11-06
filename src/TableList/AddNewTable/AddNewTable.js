import React from 'react';
import ReactDOM from 'react-dom';
import TableList from '../TableList.js'
import "./AddNewTable.css";

export default class AddNewTable extends React.Component{
    
    buttonOnClick() {
        if(document.getElementById("newTableNameInput").value != ""){
            var request = new XMLHttpRequest();
            request.open('POST', 'https://pawbackend.herokuapp.com/table', false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"name\":\"" + document.getElementById("newTableNameInput").value + "\"}");
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
        
    }

    render(){
        return React.createElement("div", {class: "addNewTable"},
                    React.createElement("input", {type: "text", id: "newTableNameInput"}),
                    React.createElement("input", {type: "submit", value: "Add", id: "newTableNameSubmitButton", onClick: this.buttonOnClick}));
    }
}