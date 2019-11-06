import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Main.js';
import './AddNewList.css';


export default class AddNewList extends React.Component{

    id = this.props.id;

    buttonOnClick(id){
        if(document.getElementById("newListNameInput").value != ""){
            var request = new XMLHttpRequest();
            request.open('POST', 'https://pawbackend.herokuapp.com/table/' + this.id + '/list' , false);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send("{\"name\":\"" + document.getElementById("newListNameInput").value + "\"}");
        }

        if(document.getElementById("Main")){
            ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
        }
        ReactDOM.render(<Main />, document.getElementById("MainContainer"));
    }

    render(){
        return React.createElement("div", {class: "addNewList"},
                    React.createElement("input", {type: "text", id: "newListNameInput"}),
                    React.createElement("input", {type: "submit", value: "Add", id: "newListNameSubmitButton", onClick: () => {this.buttonOnClick(this.id)}}));
    }
}