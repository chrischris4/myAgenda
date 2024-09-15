import '../styles/Header.css';
import React from 'react';

function Header({ connectedUser, userPseudo, userImage }) {
    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = today.toLocaleDateString('fr-FR', options);

    return (
        <div className="header">
            <div className={`headerTitle ${!connectedUser ? 'hideUser' : ''}`}>
                <div className="headerTitleContent">
                    <h1>My Agenda</h1>
                    <h2>Votre calendrier personnalisé</h2>
                </div>
                <div className="headerDate">
                    <h2>{formattedDate}</h2>
                </div>
            </div>
            <div className={`headerUser ${connectedUser ? 'showUser' : ''}`}>
                <img className="userImg" src={userImage} alt="" />
                <h2>{userPseudo}</h2>
            </div>
        </div>
    );
}

export default Header;
