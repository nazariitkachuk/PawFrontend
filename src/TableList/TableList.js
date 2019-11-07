import React from 'react';
import Table from './Table/Table.js'
import AddNewTable from './AddNewTable/AddNewTable.js'
import "./TableList.css";

export default class TableList extends React.Component{
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

        return React.createElement("div", {id: "list", class: "tableList"}, tables, <AddNewTable />);
    }
}