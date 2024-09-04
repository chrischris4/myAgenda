import React, { useState, useEffect } from 'react';
import { getEvents } from '../common';
import Events from '../components/Events';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import Settings from '../components/Settings';
import '../styles/Home.css';
import HomePage from '../components/HomePage';
import SelectedDaySection from '../components/SelectedDaySection';

function Home() {
    const [activeTab, setActiveTab] = useState('Calendrier');
    const [showModal, setShowModal] = useState(false);
    const [activeModalSection, setActiveModalSection] = useState('');
    const [connectedUser, setConnectedUser] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [topLink, setTopLink] = useState(false);

    const showTopLink = () => {
        if (window.scrollY > 0) {
            // Ajustez ce seuil selon vos besoins
            setTopLink(true);
        } else {
            setTopLink(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', showTopLink);
    }, []);

    const isUserConnected = () => {
        setConnectedUser(true);
    };

    const handleDateClick = date => {
        setSelectedDate(date);
        setActiveTab('Jour');
    };

    const handlePrevDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 1); // Reculer d'un jour
            return newDate;
        });
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1); // Avancer d'un jour
            return newDate;
        });
    };

    useEffect(() => {
        if (connectedUser) {
            const fetchEvents = async () => {
                const response = await getEvents();
                if (!response.error) {
                    setEvents(response.events);
                } else {
                    console.error(response.message);
                }
            };

            fetchEvents();
        }
    }, [connectedUser]);

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Calendrier':
                return <Calendar onDateClick={handleDateClick} />;
            case 'Rendez-vous':
                return (
                    <Events
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                        events={events}
                    />
                );
            case 'Paramètres':
                return <Settings />;
            case 'Jour':
                return (
                    <SelectedDaySection
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                        date={selectedDate}
                        events={events}
                        onPrevDay={handlePrevDay} // Passer la fonction pour le jour précédent
                        onNextDay={handleNextDay} //
                    />
                );
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
            {!connectedUser && (
                <HomePage
                    onShowModalClick={section => {
                        setShowModal(true);
                        setActiveModalSection(section);
                    }}
                />
            )}
            {connectedUser && (
                <div className="homeContent">
                    <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="homeSection">{renderActiveTab()}</div>
                </div>
            )}
            {showModal && (
                <div className="modalOverlay">
                    <Modal
                        setConnectedUser={isUserConnected}
                        onClose={() => setShowModal(false)}
                        activeSection={activeModalSection}
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                    />
                </div>
            )}
            <div
                className={`topLink ${topLink ? 'showTopLink' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <span className="material-symbols-rounded">
                    keyboard_arrow_up
                </span>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
