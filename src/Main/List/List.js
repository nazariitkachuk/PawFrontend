import React from 'react';
import Note from './Note/Note.js';
import AddNode from './AddNode/AddNode.js';
import "./List.css";

export default class List extends React.Component{
    
    id = this.props.id;
    name = this.props.name;

    render(){
        var table = [<Note id = "0" title = "title0" content = "content0" />,
                    <Note id = "1" title = "title1" content = "content1" />,
                    <Note id = "2" title = "title2" content = "content2" />,
                    <AddNode />];

        return React.createElement("div", {class: "listWrapper"}, 
                    React.createElement("div", {class: "listTitle"}, this.name),
                    React.createElement("div", {class: "listContent"}, table));
    }
}