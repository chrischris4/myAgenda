// src/components/Nav.js
import { React } from 'react';
import '../styles/Nav.css';

function Nav({ activeTab, setActiveTab, stuckNav }) {
    const handleNavClick = tab => {
        setActiveTab(tab);
    };

    return (
        <div className={`nav ${stuckNav ? 'stuckNav' : ''}`}>
            <nav>
                <ul>
                    <li
                        className={`link ${activeTab === 'Calendrier' ? 'selected' : ''}`}
                        onClick={() => {
                            handleNavClick('Calendrier');
                            window.scrollTo({ top: 0 });
                        }}
                    >
                        Calendriers
                    </li>
                    <li
                        className={`link ${activeTab === 'Rendez-vous' ? 'selected' : ''}`}
                        onClick={() => {
                            handleNavClick('Rendez-vous');
                            window.scrollTo({ top: 0 });
                        }}
                    >
                        Evenements
                    </li>
                    <div className="navSection">
                        <li
                            className={`link linkSection ${activeTab === 'Paramètres' ? 'selected' : ''}`}
                            onClick={() => {
                                handleNavClick('Paramètres');
                                window.scrollTo({ top: 0 });
                            }}
                        >
                            <span className="material-symbols-rounded">
                                settings
                            </span>
                        </li>
                        <li
                            className={`link linkSection ${activeTab === 'Dashboard' ? 'selected' : ''}`}
                            onClick={() => {
                                handleNavClick('Dashboard');
                                window.scrollTo({ top: 0 });
                            }}
                        >
                            <span className="material-symbols-rounded">
                                home
                            </span>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
