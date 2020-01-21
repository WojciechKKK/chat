import React, { Component } from 'react';
import './SendMessage.scss';

class SendMessage extends Component{
    constructor(){
        super();
        this.state = {
            valInputMessage: '',
            placeholderMessage: "wpisz wiadomość"
        }
    }

     setHandleMessage = (e) => {
        this.setState({
            valInputMessage: e.target.value
        })
    }
  
    sendMessage = (e) => {
        const { valInputMessage } = this.state;
        const { nameUser, colorUser } = this.props;
        if(valInputMessage) {
            let dataUser = { 
                name: nameUser,
                message: valInputMessage,
                colorName: colorUser
            }
            $.ajax({
                url: 'sendMessage.php',
                method:'POST',
                data: dataUser
            })
            .done( resp => {
                this.setState({
                    valInputMessage: ''
                });
            })
            .fail( err => console.error(err))
            e.preventDefault();
        }
    }
    sendMessageEnter = (e) => {
        if(e.charCode == 13){
            this.sendMessage(e);
        }
    }

    render(){
        const { valInputMessage, placeholderMessage } = this.state;
        return(
            <div className="sendMessage">
                <form className="sendMessage-form" onSubmit={this.sendMessage}>
                    <label htmlFor="message">
                        <input id="message" className="sendMessage-input" type="text" onChange={this.setHandleMessage} onKeyPress={this.sendMessageEnter} value={valInputMessage} placeholder={placeholderMessage} required />
                    </label>
                    <button className="sendMessage-btn" type="submit" name="submit">wyślij</button>
                </form>
            </div> 
        )
    }
}

export default SendMessage