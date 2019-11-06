import React from 'react';
import Note from './Note/Note.js'
import "./Table.css";

export default class Table extends React.Component{

    id = this.props.id
    name = this.props.name;

    render(){

        var tables = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/'+this.id+'/list', false);

        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                tables.push(<Note id = {element.id} name = {element.name} />)
            });
        };

        request.send();

        return React.createElement("div", {class: "table"}, 
                    React.createElement("div", {class: "tableTitle"}, this.name),
                    React.createElement("div", {class: "tableContent"}, tables));
    }
}