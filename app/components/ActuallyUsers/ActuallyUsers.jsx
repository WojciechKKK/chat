import React, { Component } from 'react';
import './ActuallyUsers.scss';

class ActuallyUsers extends Component{
    constructor(){
        super();
        this.state = {
            intervalId: 1,
            items: 0
        }
    }

    componentDidMount = () => {
        this.saveLogin();

        const intervalId = setInterval(() => {
            this.getItemUsers();
        }, 1000);
        this.setState({ intervalId: intervalId })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId);
        this.deleteLogin();
    }

    getItemUsers = () => {
        $.ajax({
            url: 'checkItemUsers.php',
            method: 'GET',
        })
        .done( resp => {
            resp == this.state.items ? null : this.downloadLogin(resp);
        })
        .fail( err => console.error(err))
    }

    downloadLogin = (count) => {
        const placeChat = document.querySelector('.actuallyUsers-list');
        //need to a validation from downloadUsers.php / if(!isset($example)) { 'Location: index.html'}
        const dateExample = {
            nameExample: 'example'
        }
  
        $.ajax({
            url: 'downloadUsers.php',
            method:'GET',
            data: dateExample
        })
        .done( resp => {
            placeChat.innerHTML = resp;
            // placeChat.scrollTo(0,placeChat.scrollHeight);
            this.setState({
                items: count
            })
        })
        .fail( err => console.error(err))
    }
    
    saveLogin = () => {
        const { name, color } = this.props;
        let dataUser = { 
            name: name,
            color: color
        }
        $.ajax({
            url: 'saveUser.php',
            method:'POST',
            data: dataUser
        })
        .done( resp => {
            // console.log('saved:', resp);
        })
        .fail( err => console.error(err))
    }
    
    deleteLogin = () => {  
        const { name } = this.props;
        let actuallyUser = {
            user: name
        }
        $.ajax({
            url: 'deleteUser.php',
            method: 'POST',
            data: actuallyUser,
        })
        .done( resp => {
            // console.log('del:', resp)
        })
        .fail( err => console.error(err))
    }

    render(){
        return(
            <div className="actuallyUsers">
                <h3 className="actuallyUsers-title">Zalogowani użytkownicy:</h3>
                <ul className="actuallyUsers-list">
                    {/* <i className="actuallyUsers-el" style={{color: 'red'}}>Adam</i>
                    <i className="actuallyUsers-el"style={{color: 'blue'}}>Roman</i>
                    <i className="actuallyUsers-el"style={{color: 'green'}}>Paweł</i> */}
                </ul>
            </div>
        )
    }
}

export default ActuallyUsers