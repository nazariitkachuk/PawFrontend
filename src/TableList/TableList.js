import React from 'react';
import AddNewTable from './AddNewTable/AddNewTable.js'
import "./TableList.css";
import RESTrequests from '../RESTrequests.js';

export default class TableList extends React.Component{
    render(){
        var tables = RESTrequests.getTables();

        return React.createElement("div", {id: "list", class: "tableList"}, tables, <AddNewTable />);
    }
}