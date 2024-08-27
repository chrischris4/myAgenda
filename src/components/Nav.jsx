// src/components/Nav.js
import React from 'react';
import '../styles/Nav.css';

function Nav({ activeTab, setActiveTab }) {

    const handleNavClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="nav">
            <nav>
                <ul>
                    <li 
                        className={`link ${activeTab === 'Calendrier' ? 'selected' : ''}`}
                        onClick={() => handleNavClick('Calendrier')}
                    >
                        Calendrier
                    </li>
                    <li 
                        className={`link ${activeTab === 'Rendez-vous' ? 'selected' : ''}`}
                        onClick={() => handleNavClick('Rendez-vous')}
                    >
                        Rendez-vous
                    </li>
                    <li 
                        className={`link ${activeTab === 'Paramètres' ? 'selected' : ''}`}
                        onClick={() => handleNavClick('Paramètres')}
                    >
                        Paramètres
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
