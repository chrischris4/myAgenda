import React, { useState } from 'react';
import Events from '../components/Events';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import Settings from '../components/Settings';
import '../styles/Home.css';
import HomePage from '../components/HomePage';

function Home() {
    const [activeTab, setActiveTab] = useState('Calendrier');
    const [showModal, setShowModal] = useState(false);
    const [activeModalSection, setActiveModalSection] = useState('');
    const [connectedUser, setConnectedUser] = useState(false);

    const isUserConnected = () => {
        setConnectedUser(true);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Calendrier':
                return <Calendar />;
            case 'Rendez-vous':
                return (
                    <Events
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                    />
                );
            case 'Paramètres':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="home">
            <Header
                onShowModalClick={section => {
                    setShowModal(true);
                    setActiveModalSection(section);
                }}
                setConnectedUser={isUserConnected}
                connectedUser={connectedUser}
            />
            {!connectedUser && <HomePage setConnectedUser={isUserConnected} />}
            {connectedUser && (
                <div className="homeContent">
                    <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="homeSection">{renderActiveTab()}</div>
                </div>
            )}
            {showModal && (
                <div className="modalOverlay">
                    <Modal
                        onClose={() => setShowModal(false)}
                        activeSection={activeModalSection}
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                    />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;
