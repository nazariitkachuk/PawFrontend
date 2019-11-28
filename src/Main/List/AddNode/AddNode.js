import React from 'react';
import './AddNode.css';

export default class AddNode extends React.Component{

    render(){
        return React.createElement("div", {class: "addNewNodeWrapper"},
                    React.createElement("input", {type: "text", id: "newNodeTitleInput"}),
                    React.createElement("input", {type: "submit", value: "Add", id: "newNodeAddButton"}));
    }
}