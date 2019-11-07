import React from 'react';
import "./List.css";

export default class Note extends React.Component{
    
    id = this.props.id;
    name = this.props.name;

    render(){
        return React.createElement("div", {class: "list"}, this.name);
    }
}