import '../styles/Header.css';
import React from 'react';

function Header({ onShowModalClick }) {
    const handleModalSubscribeClick = () => {
        onShowModalClick('modalSubscribe');
    };

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
            <div className="headerTitle">
                <div className="headerTitleContent">
                    <h1>My Agenda</h1>
                    <h2>Votre calendrier personnalisé</h2>
                </div>
                <div className="headerDate">
                    <h2>{formattedDate}</h2>
                </div>
            </div>
            <div className="headerUser">
                <img
                    className="userImg"
                    src="https://i.ibb.co/wh7Hy6g/think-817844.png"
                    alt=""
                />
                <h2>UserName</h2>
                <div className="headerLinks">
                    <h3>Se connecter</h3>
                    <h3 onClick={handleModalSubscribeClick}>Crée un compte</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;
