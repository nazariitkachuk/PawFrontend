import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../Main/Main.js';
import "./Table.css";

export default class Table extends React.Component{
    //sas
    id = this.props.id;
    name = this.props.name;

    buttonOnClick(id, name){
        if(document.getElementById("Main")){
            ReactDOM.unmountComponentAtNode(document.getElementById("MainContainer"));
        }
        ReactDOM.render(<Main id = {id} />, document.getElementById("MainContainer"));

        document.getElementById("changeNameInput").value = name;
    }

    render(){
        return React.createElement("div", {class: "table", onClick: () => this.buttonOnClick(this.id, this.name)}, this.name);
    }
}