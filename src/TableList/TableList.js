import React from 'react';
import Table from './Table/Table.js'
import AddNewTable from './AddNewTable/AddNewTable.js'
import "./TableList.css";

export default class TableList extends React.Component{
    render(){
        var tables = [];

        tables = [<Table id = "0" name = "TableMock0" />,
                <Table id = "1" name = "TableMock1" />,
                <Table id = "2" name = "TableMock2" /> ];

        // var request = new XMLHttpRequest();
        // request.open('GET', 'https://pawbackend.herokuapp.com/table', false);
        // request.setRequestHeader('Content-Type', 'application/json');
        // request.setRequestHeader('Cookie', 'com-session=ada312a482d10ad386ca83350638b82230af42c5-___TS%011574113120289%00___ID%0133981103-2c82-4587-9c32-d0a9045bac28%00username%01qwe');

        // request.onload = function(){
        //     var data = JSON.parse(this.responseText);
            
        //     data.forEach(element => {
        //         tables.push(<Table id = {element.id} name = {element.name} />)
        //     });
        // };

        // request.send();

        return React.createElement("div", {id: "list", class: "tableList"}, tables, <AddNewTable />);
    }
}