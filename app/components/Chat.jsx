import React, { Component } from 'react'
import './Chat.scss';
import Login from './Login/Login.jsx'
import AllMessages from './AllMessages/AllMessages.jsx'
import SendMessage from './SendMessage/SendMessage.jsx'
import ActuallyUsers from './ActuallyUsers/ActuallyUsers.jsx'

class Chat extends Component{
    constructor(){
        super();
        this.state = {
            valInputName: '',
            valInputColor: '#000000',
            showChat: false,
        }
    }
  
    //for Name Comp
    setHandleName = (name) => {
        this.setState({
            valInputName: name
        })
    }
    setHandleColor = (color) => {
        this.setState({
            valInputColor: color
        })
    }

    showChat = () => {
        this.setState({
            showChat: true
        })
        this.saveInformationUser('dołączył');
    }  

    closeChat = () => {
        this.setState({
            showChat: false,
            valInputName: '',
            valInputColor: '#000000'
        })
        this.saveInformationUser('opuścił');
    } 

    saveInformationUser = (text) => {
        const { valInputName, valInputColor } = this.state;
        const addToChat = valInputName.toUpperCase() + ` ${text}/a do chatu`;
        let dataUser = { 
            name: addToChat,
            message: '',
            colorName: valInputColor
        }
        $.ajax({
            url: 'sendMessage.php',
            method:'POST',
            data: dataUser
        })
        .done( resp => {
            // console.log(resp);
        })
        .fail( err => console.error(err))
    }

    render(){
        const { valInputName, valInputColor, showChat } = this.state;
        return(
            <div className="chat">
               {
                   !showChat 
                   ? <Login fnSetName={this.setHandleName} fnSetColor={this.setHandleColor} valName={valInputName} valColor={valInputColor} fnStartChat={this.showChat}/>
                   :  <div className="chat-messages">
                        <ActuallyUsers name={valInputName} color={valInputColor}/>
                        <AllMessages fnClick={this.closeChat} userName={valInputName} />
                        <SendMessage nameUser={valInputName} colorUser={valInputColor}/>
                    </div>
               }
            </div>
        )
    }
}


export default Chat