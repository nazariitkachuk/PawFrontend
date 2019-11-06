import React from 'react';
import ReactDOM from 'react-dom';
import List from './List/List.js';
import AddNewList from './AddNewList/AddNewList.js';
import TableList from '../TableList/TableList.js';
import "./Main.css";

export default class Main extends React.Component{

    id = this.props.id;

    buttonOnClick(id){

        if(document.getElementById("changeNameInput").value != ""){
            var request = new XMLHttpRequest();
            request.open('PUT', 'https://pawbackend.herokuapp.com/table/' + this.id, false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"id\":\"" + id + "\", \"name\":\"" + document.getElementById("changeNameInput").value + "\"}");
        }

        if(document.getElementById("tableWrapper")){
            ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
        }
        ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
        
    }
    
    render(){
        var tables = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/'+this.id+'/list', false);

        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                tables.push(<List id = {element.id} name = {element.name} />)
            });
            console.log(tables);
        }

        request.send();
        
        return React.createElement("div", {id: "Main"},
                    React.createElement("div", {id: "changeNameWrapper"},
                        React.createElement("input", {id: "changeNameInput", type: "text"}),
                        React.createElement("input", {id: "changeNameSubmitButton", type: "submit", value: "Change table name", onClick: ()=>{this.buttonOnClick(this.id)}})), 
                    React.createElement("div", {id: "listWrapper"}, tables, <AddNewList id = {this.id} />));
    }
}