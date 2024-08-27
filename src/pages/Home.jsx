import React, { useState } from 'react';
import Appointment from '../components/Appointment';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ModalUser from '../components/ModalUser';
import Nav from '../components/Nav';
import Settings from '../components/Settings';
import '../styles/Home.css';

function Home() {
    const [activeTab, setActiveTab] = useState('Calendrier');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Calendrier':
                return <Calendar />;
            case 'Rendez-vous':
                return <Appointment />;
            case 'Paramètres':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="home">
            <Header />
            <div className='homeContent'>
                <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className='homeSection'>
                    {renderActiveTab()}
                </div>
            </div>
            <div className='modalOverlay'>
                <ModalUser />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
