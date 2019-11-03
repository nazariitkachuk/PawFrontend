import React from 'react';
import "./Header.css";

export default class Header extends React.Component{
    render(){
        return React.createElement("header", null,
                    React.createElement("img", {class: "imageWithBorder floatLeft", src: "https://icon-library.net/images/house-icon-white/house-icon-white-22.jpg"}),
                    React.createElement("img", {class: "imageWithBorder floatLeft", src: "http://sicsglobal.co.in/content/img/My%20Apps.png"}),
                    React.createElement("img", {class: "imageWithBorder floatLeft", src: "https://icon-library.net/images/white-search-icon-png/white-search-icon-png-19.jpg"}),
                    React.createElement("label", {class: "websiteNameLable floatLeft"}, "AppName"),
                    React.createElement("img", {class: "imageWithBorder floatRight", src: "https://icon-library.net//images/white-profile-icon/white-profile-icon-6.jpg"}));
    }
}
