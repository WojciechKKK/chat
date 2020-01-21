import React, { Component } from 'react'
import './Login.scss';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            alertName: 'Nie podałeś imienia',
            alertColor: 'Wybierz kolor'
        }
    }

    setName = (e) => {
        if(typeof this.props.fnSetName == 'function'){
            this.props.fnSetName(e.target.value);
        }
    }
    setColor = (e) => {
        if(typeof this.props.fnSetColor == 'function'){
            this.props.fnSetColor(e.target.value);
        }
    }

    setStart = () => {
        const { alertName, alertColor } = this.state;
        const { valName, valColor } = this.props;
        //check input != empty
        if(valName.length < 3){
            alert(alertName)
        } else if(valColor == '#000000'){
            alert(alertColor)
        }else {
            this.props.fnStartChat();
        }
    }
    enterStart = (e) => {
        if(e.charCode == 13){
            this.setStart();
        }
    }
    clearName = () => {
        if(typeof this.props.fnSetName == 'function'){
            this.props.fnSetName('');
        }
    }
    render(){
        const { valName, valColor } = this.props;
        return(
            <div className="chat-login">
                <label htmlFor="name" className="chat-login-labelName">
                    <input id="name" type="text" onChange={this.setName} value={valName} style={{color: valColor}} onKeyPress={this.enterStart} required/>
                    <span className="name-text">Imię:</span>
                    <i onClick={this.clearName} className="fas fa-backspace" title="Usuń"></i>
                </label>
                <label htmlFor="color" className="chat-login-labelColor">
                    <input id="color" className="name-color" type="color" name="favcolor" onChange={this.setColor} value={valColor} required/>
                    <span className="color-text">Kolor:</span>
                </label>
                <button className="chat-login-btn" onClick={this.setStart}>Zaloguj</button>
            </div>
        )
    }
}

export default Login