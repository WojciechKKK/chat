import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import '../styles/main.scss'
import Chat from '../components/Chat.jsx'

const App = () => <Chat />


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
