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
                        onClick={() => handleNavClick('Calendrier')}
                    >
                        Calendriers
                    </li>
                    <li
                        className={`link ${activeTab === 'Rendez-vous' ? 'selected' : ''}`}
                        onClick={() => handleNavClick('Rendez-vous')}
                    >
                        Evenements
                    </li>
                    <div className="navSection">
                        <li
                            className={`link linkSection ${activeTab === 'Paramètres' ? 'selected' : ''}`}
                            onClick={() => handleNavClick('Paramètres')}
                        >
                            <span className="material-symbols-rounded">
                                settings
                            </span>
                        </li>
                        <li
                            className={`link linkSection ${activeTab === 'Dashboard' ? 'selected' : ''}`}
                            onClick={() => handleNavClick('Dashboard')}
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
