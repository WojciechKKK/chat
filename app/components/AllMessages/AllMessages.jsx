import React, { Component } from 'react'
import './AllMessages.scss';


class AllMessages extends Component{
    constructor(){
        super();
        this.state = {
            items: 0,
            dateTimeLogin:'',
            intervalId: 1,
            ask: 'Czy chcesz opuścić chat?',
            whiteChat: false
        }
    }

    componentDidMount = () => {
        //set a date and time log in user
        this.getActuallyDateTime();
         
        //start download chat
        const intervalId = setInterval(() => {
            this.getItemChat();
         },1000);
         this.setState({ intervalId: intervalId })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId);
    }

    getItemChat = () => {
        let actuallyDate = {
            dateInfo: this.state.dateTimeLogin
        }
        $.ajax({
            url: 'checkItem.php',
            method: 'GET',
            data: actuallyDate,
        })
        .done( resp => {
            resp == this.state.items ? null : this.getMessages(resp);
        })
        .fail( err => console.error(err))
    }

    getMessages = (count)  => {
        const placeChat = document.querySelector('.allMessages .allMessages-container');
        let actuallyDate = {
            dateInfo: this.state.dateTimeLogin,
            loginName: this.props.userName
        }
  
        $.ajax({
            url: 'downloadChat.php',
            method:'GET',
            data: actuallyDate,
        })
        .done( resp => {
            placeChat.innerHTML = resp;
            placeChat.scrollTo(0,placeChat.scrollHeight);
            this.setState({
                items: count
            })
        })
        .fail( err => console.error(err))
     }
     
     getActuallyDateTime = () => {
        let monthsArr = ["01", "02", "03", "04","05", "06", "07", "08", "09","10", "11", "12"];
        let dateObj = new Date();
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth(); //return from 0 to 11 
        let numDay = dateObj.getDate();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
        let second = dateObj.getSeconds();
       
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        if (hour < 10) hour = "0" + hour;
       
        const result = `${year}-${monthsArr[month]}-${numDay} ${hour}:${minute}:${second}`;
        this.setState({
            dateTimeLogin: result
        })
     }
    
     closeChat = () =>{
        const closeChat = confirm(this.state.ask);
        if(closeChat){
            clearInterval(this.state.intervalId)
            this.props.fnClick();
            //close dark mode 
            this.darkMode();
            location.reload()
        }
     }
     showSettings = () => {
        this.setState({
            whiteChat: !this.state.whiteChat
        })
       this.darkMode();
     }

     darkMode = () => {
        const chat = document.querySelector('.chat');
        chat.classList.toggle('chat-white');

        const loginUserText = document.querySelector('.actuallyUsers-title');
        loginUserText.classList.toggle('actuallyUsers-title_white')

        const headerLoginUser = document.querySelector('.actuallyUsers');
        headerLoginUser.classList.toggle('actuallyUsers__white')

        const allMessagesInfo = document.querySelector('.allMessages-container');
        allMessagesInfo.classList.toggle('allMessages-container__white');
        
       const close = document.querySelector('.allMessages-close')
       close.classList.toggle('allMessages-close__white')

       const settings = document.querySelector('.allMessages-settings');
       settings.classList.toggle('allMessages-settings__white')
     }

    render(){
        // const test = [
        //     'ulla ut tortor malesuada, vestibulum ante non',
        //     'vel tincidunt ante',
        //     'Nam id maximus odio, ut semper nisi.',
        //     'pulvinar fringilla lectu',
        //     'pulvinar fringilla lectu',
        //     'yes',
        //     'ulla ut tortor malesuada, vestibulum ante non. Nam id maximus odio, ut semper nisi',
        //     'pulvinar fringilla lectu  ut semper nis',
        //     'pulvinar fringilla lectu, vel tincidunt',
        //     'pulvinar fringilla ',
        //     'vel tincidunt',
        //     'vel tincidunt vel tincidunt',
        //     'ulla ut tortor malesuada, vestibulum ante non. Nam id maximus odio, ut semper nisi',
        // ];
        return(
            <div className="allMessages">
                <p className="allMessages-close" onClick={this.closeChat} title="Zamknij chat">&times;</p>
                <p className="allMessages-settings" onClick={this.showSettings} title="Ustawienia">#</p>
                <div className="allMessages-container">
                    {/* {
                        test.map(el => {
                           return  <li className='allMessages-element'>
                                        <p className="allMessages-info">
                                            <b className="allMessages-name">Imie</b> 
                                            <i className='allMessages-date'>22:23</i><br />
                                            {el}
                                        </p>
                                    </li>
                            })
                    } */}
                </div>
            </div>
        )
    }
}

export default AllMessages