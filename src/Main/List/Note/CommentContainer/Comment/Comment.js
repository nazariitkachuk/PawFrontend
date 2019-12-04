import React from 'react';
import ReactDOM from 'react-dom';
import "./Comment.css";

export default class Comment extends React.Component{

    render(){
        return React.createElement("div", {class: "commentWrapper"}, 
                    React.createElement("textarea", {type: "text", id: "commentContent"}));
    }
}