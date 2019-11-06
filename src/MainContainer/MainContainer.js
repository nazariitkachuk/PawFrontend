import React from 'react';
import Table from '../Table/Table.js'
import "./MainContainer.css";
import { watchFile } from 'fs';

export default class MainContainer extends React.Component{

    render(){
        var tables = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table', false);

        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                tables.push(<Table id = {element.id} name = {element.name} />)
            });
        };

        request.send();
        
        return React.createElement("div", {id: "Container", class: "mainContainer"}, tables);
        
    }

}