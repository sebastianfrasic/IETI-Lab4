import React, { useState } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login';
import {Tasks} from './components/Tasks';

const App = () => {

    const userData = {
        username: "Sebastian",
        password: "12345",
        email: "juan.frasica@mail.com"
    };

    localStorage.setItem("Username", userData.username);
    localStorage.setItem("Password", userData.password);

    let initialLoggedInState = localStorage.getItem("isLoggedIn");
    if(initialLoggedInState === "false"){
        initialLoggedInState = false;
    } else if (initialLoggedInState === "true"){
        initialLoggedInState = true;
    }

    const[isLoggedInState,setIsLoggedInState] = useState(initialLoggedInState);

    const handleSuccessfullyLogin = (e) => {
        setIsLoggedInState(true);
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "/home";
    }

    const handleFailedLogin = (e) => {
        alert("Usuario o Clave Incorrectos");
        setIsLoggedInState(false);
        localStorage.setItem("isLoggedIn", false);
    }

    const handleLogout = () => {
        setIsLoggedInState(false);
        localStorage.setItem("isLoggedIn", false);
        window.location.href = "/";
    }

    const items = [{
        "description": "Do IETI Lab 3",
        "responsible": {
            "name": userData.username,
            "email": userData.email
        },
        "status": "In Progress",
        "dueDate": 156464645645
    },{
        "description": "Do IETI Lab 4",
        "responsible": {
            "name": userData.username,
            "email": userData.email
        },
        "status": "Ready",
        "dueDate": 156475645646
    },{
        "description": "Do Project´s stuff",
        "responsible": {
            "name": userData.username,
            "email": userData.email
        },
        "status": "Completed",
        "dueDate": 158464685646}
    ];

    const LoginView = () => (<Login successfully={handleSuccessfullyLogin} failed={handleFailedLogin}/>);
    const MainView = () => (<Tasks items={items} logout={handleLogout} email={userData.email} name={userData.username}/>);
    const View = isLoggedInState ? MainView : LoginView ;

    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={View}/>
                <Route path="/home" component={View}/>
            </div>
        </Router>
    );
}

export default App;
