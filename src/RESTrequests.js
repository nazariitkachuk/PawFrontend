import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header.js';
import TableList from './TableList/TableList.js';
import MainContainer from './MainContainer/MainContainer.js';
import LoginView from './LoginView/LoginView.js';
import Main from './Main/Main.js';
import List from './Main/List/List.js';
import Table from './TableList/Table/Table.js';
import Note from './Main/List/Note/Note.js';
import Comment from './Main/List/Note/CommentContainer/Comment/Comment.js';
import CommentContainer from './Main/List/Note/CommentContainer/CommentContainer.js';
import Tag from './Main/Tag/Tag.js';

export default class RESTrequests{

    static authorization = ""

    static logIn(email, password){
        var data = JSON.stringify({"email": email, "password": password})

        fetch("https://pawbackend.herokuapp.com/login",{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            RESTrequests.authorization = response.headers.get('Authorization');
            document.cookie = "authorization=" + RESTrequests.authorization;
            response.json().then(result =>{
                if(result.httpCode === 200){
                    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                    var elements = [<Header />, React.createElement("div", {id: "popupContainer"}), <MainContainer />];
                    ReactDOM.render(elements, document.getElementById("root"));
                }else{
                    alert(result.message);
                }
            });
        });
    }

    static signUp(email, lastName, firstName, password){

        var data = JSON.stringify({"email": email, 
            "lastName": lastName, "firstName": firstName, "password": password});

        fetch('https://pawbackend.herokuapp.com/register', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json().then(result => {
            if(result.httpCode === 201){
                alert(result.message);
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                ReactDOM.render(<LoginView />, document.getElementById("root"));
            }else{
                alert(result.message);
            }
        }));
    }

    static addNewTable(tableName){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(tableName !== ""){
            var data = JSON.stringify({"name": tableName});

            fetch('https://pawbackend.herokuapp.com/table', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                if(document.getElementById("tableWrapper")){
                    ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
                }
                ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
            });
        }
    }

    static updateTableName(tableId, tableNewName){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(tableNewName !== ""){
            var data = JSON.stringify({"tableId": tableId, "name": tableNewName});

            fetch('https://pawbackend.herokuapp.com/table/' + tableId, {
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                if(document.getElementById("tableWrapper")){
                    ReactDOM.unmountComponentAtNode(document.getElementById("tableWrapper"));
                }
                ReactDOM.render(<TableList />, document.getElementById("tableWrapper"));
            });

            // var request = new XMLHttpRequest();
            // request.open('PUT', 'https://pawbackend.herokuapp.com/table/' + tableId, false);
            // request.setRequestHeader('Content-Type', 'application/json');
            // request.setRequestHeader('Authorization', RESTrequests.authorization);

            // request.send(data);
            
        }

    }

    static addNewList(tableId, listName){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(listName !== ""){
            var data = JSON.stringify({"name": listName});

            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                if(document.getElementById("Main")){
                    ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
                }
                ReactDOM.render(<Main />, document.getElementById("MainContainer"));
            });
        }
    }

    static getTables(){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;


        var tables = [];

        // fetch('https://pawbackend.herokuapp.com/table', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': RESTrequests.authorization
        //     }
        // }).then(response => response.json().then(result => {
        //     console.log(result);
        //     result.forEach(element => {
        //         tables.push(<Table id = {element.tableId} name = {element.name} />)
        //     });
        //     return tables;
        // }));

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);

        request.onload = function(){
            var data = JSON.parse(this.responseText);
            
            data.forEach(element => {
                tables.push(<Table id = {element.tableId} name = {element.name} />)
            });
        };

        request.send();

        return tables;
    }

    static getLists(tableId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;


        var lists = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/'+tableId+'/list', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                console.log(element);
                lists.push(<List tableId = {tableId} id = {element.listId} name = {element.name} />)
            });
        }

        request.send();

        return lists;
    }

    static getListsArch(tableId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;


        var lists = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/'+tableId+'/card/archive', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText)

            data.forEach(element => {
                console.log(element);
                lists.push(<Note tableId = {tableId} listId = {element.belongsToListId} 
                    id = {element.cardId}  title = {element.name} content = {element.description} />)
            });
        }

        request.send();

        return lists;
    }

    static getCards(tableId, listId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        var cards = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText);

            data.forEach(element => {
                console.log(element);
                cards.push(<Note tableId = {tableId} listId = {listId} id = {element.cardId}  title = {element.name} content = {element.description} />);
            });
        }

        request.send();

        return cards;
    }

    static addNewCard(tableId, listId, title){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(title !== ""){
            var data = JSON.stringify({"name": title, "description": ""});
            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                if(document.getElementById("Main")){
                    ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
                }
                ReactDOM.render(<Main />, document.getElementById("MainContainer"));
            });
        }
    }

    static editCard(tableId, listId, cardId, newTitle, newContent){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(newTitle !== ""){
            var data = JSON.stringify({"name": newTitle, "description": newContent});
            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId, {
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));
                if(document.getElementById("Main")){
                    ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
                }
                ReactDOM.render(<Main />, document.getElementById("MainContainer"));
            });
        }
    }

    static deleteCard(tableId, listId, cardId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {
            if(document.getElementById("Main")){
                ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
            }
            ReactDOM.render(<Main />, document.getElementById("MainContainer"));
        });
    }

    static archCard(tableId, listId, cardId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + "/archive", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {
            if(document.getElementById("Main")){
                ReactDOM.unmountComponentAtNode(document.getElementById("Main"));
            }
            ReactDOM.render(<Main />, document.getElementById("MainContainer"));
        });
    }



    static getComments(tableId, listId, cardId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        var comments = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/comment', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText);

            data.forEach(element => {
                console.log(element);
                comments.push(<Comment tableId = {tableId} listId = {listId} 
                    cardId = {cardId}  id = {element.commentId}
                    user = {element.authorName} content = {element.content} />);
            });
        }

        request.send();

        return comments;
    }

    static addNewComments(tableId, listId, cardId, content){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(content !== ""){
            var data = JSON.stringify({"content": content});

            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/comment', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

                ReactDOM.render(
                    React.createElement("form", {class: "popupWrapper"},
                        React.createElement("div", {class: "popup"},
                            React.createElement("div", {class: "popupButton labelOnHover",
                                onClick: () => ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"))}, "Back"),
                            React.createElement("div", {id: "commentsWrapper"}, 
                                <CommentContainer tableId = {tableId} listId = {listId} cardId = {cardId} />))
                        ),
                    document.getElementById('popupContainer')
                );
            });
        }
    }

    static deleteComment(tableId, listId, cardId, commentId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/comment/' + commentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {
            ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

            ReactDOM.render(
                React.createElement("form", {class: "popupWrapper"},
                    React.createElement("div", {class: "popup"},
                        React.createElement("div", {class: "popupButton labelOnHover",
                            onClick: () => ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"))}, "Back"),
                        React.createElement("div", {id: "commentsWrapper"}, 
                            <CommentContainer tableId = {tableId} listId = {listId} cardId = {cardId} />))
                    ),
                document.getElementById('popupContainer')
            );
        });
    }

    static editComment(tableId, listId, cardId, commentId, content){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        if(content !== ""){
            var data = JSON.stringify({"content": content});

            fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/comment/' + commentId, {
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': RESTrequests.authorization
                }
            }).then(response => {
                ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"));

                ReactDOM.render(
                    React.createElement("form", {class: "popupWrapper"},
                        React.createElement("div", {class: "popup"},
                            React.createElement("div", {class: "popupButton labelOnHover",
                                onClick: () => ReactDOM.unmountComponentAtNode(document.getElementById("popupContainer"))}, "Back"),
                            React.createElement("div", {id: "commentsWrapper"}, 
                                <CommentContainer tableId = {tableId} listId = {listId} cardId = {cardId} />))
                        ),
                    document.getElementById('popupContainer')
                );
            });
        }
    }

    static getTags(tableId, listId, cardId, mode){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        var tags = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/' + tableId + '/label', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText);

            data.forEach(element => {
                tags.push(<Tag tableId={tableId} listId={listId} cardId={cardId} id={element.colourId} content={element.colourName} 
                    color={element.colourHex} mode={mode}/>);
            });
        };

        request.send();

        return tags;
    }
    

    static getTagsForCard(tableId, listId, cardId, mode){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        var tagsList = this.getTags(tableId, listId, cardId, mode);
        var tags = [];

        console.log(tagsList);

        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId, false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', RESTrequests.authorization);
        
        request.onload = function(){
            var data = JSON.parse(this.responseText);
            
            if(data !== undefined){
                data.labelList.forEach(element => {
                    tagsList.forEach(e =>{
                        if(element === e.props.id){
                            tags.push(e);
                        }
                    });
                    
                });
            }
        }

        request.send();

        return tags;
    }

    static addTagToCard(tableId, listId, cardId, labelId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/label/' + labelId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {

        });
    }

    static removeTagFromCard(tableId, listId, cardId, labelId){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/list/' + listId + '/card/' + cardId + '/label/' + labelId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {

        });
    }

    static newName(tableId, id, newName){
        if(!this.checkIfAuthOk(RESTrequests.authorization))
            return;

        fetch('https://pawbackend.herokuapp.com/table/' + tableId + '/label/' + id + "/" + newName, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': RESTrequests.authorization
            }
        }).then(response => {

        });
    }

    static addTag(){

    }

    static checkIfAuthOk(token){

        var status;
        
        var request = new XMLHttpRequest();
        request.open('GET', 'https://pawbackend.herokuapp.com/table', false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', token);

        request.onload = function(){

            status = request.status;
            if(status === 401){
                ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                ReactDOM.render(
                    <LoginView />,
                    document.getElementById('root')
                );
            }else{
                RESTrequests.authorization = token;
            }
        };

        request.send();

        if(status === 200){
            return true;
        }else{
            return false;
        }
    }
}