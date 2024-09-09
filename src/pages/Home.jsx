import React, { useState, useEffect } from 'react';
import {
    getEvents,
    logoutUser,
    getAuthenticatedUser,
    getUserPseudo,
} from '../common';
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
import Dashboard from '../components/Dashboard';

function Home() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [showModal, setShowModal] = useState(false);
    const [activeModalSection, setActiveModalSection] = useState('');
    const [connectedUser, setConnectedUser] = useState(false); // Gère la connexion
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]); // Stocke les événements
    const [topLink, setTopLink] = useState(false);
    const [stuckNav, setStuckNav] = useState(false);
    const [userPseudo, setUserPseudo] = useState('');

    const addEvent = event => {
        setEvents(prevEvents => [...prevEvents, event]);
    };

    // Fonction pour afficher ou masquer le scrollToTop
    const showTopLink = () => {
        if (window.scrollY > 0) {
            setTopLink(true);
        } else {
            setTopLink(false);
        }
    };

    const stuckNavOn = () => {
        if (window.scrollY > 168) {
            setStuckNav(true);
        } else {
            setStuckNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', showTopLink);
        window.addEventListener('scroll', stuckNavOn);
        return () => {
            window.removeEventListener('scroll', showTopLink);
            window.removeEventListener('scroll', stuckNavOn);
        };
    }, []);

    // Gère la sélection de date dans le calendrier
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

    const handleLogout = () => {
        logoutUser(); // Efface les données d'authentification
        setConnectedUser(false); // Met à jour l'état de connexion
    };

    // Vérifie si l'utilisateur est authentifié et récupère les événements
    useEffect(() => {
        const checkUserAuthentication = async () => {
            const { authenticated, user } = await getAuthenticatedUser();

            if (authenticated && user.token) {
                setConnectedUser(true); // Met à jour l'état si l'utilisateur est connecté

                // Récupérer les événements ici
                const fetchEvents = async () => {
                    const response = await getEvents(); // Appel à getEvents
                    if (!response.error) {
                        setEvents(response.events); // Met à jour les événements
                    } else {
                        console.error(response.message);
                    }
                };

                fetchEvents(); // Appeler pour récupérer les événements après avoir vérifié l'authentification

                const pseudoResponse = await getUserPseudo();
                if (!pseudoResponse.error) {
                    setUserPseudo(pseudoResponse.pseudo);
                }
            } else {
                setConnectedUser(false); // Si l'utilisateur n'est pas connecté
                setEvents([]); // Réinitialiser les événements si non connecté
            }
        };

        checkUserAuthentication(); // Appelle la fonction au chargement de la page
    }, []);

    // Rend l'onglet actif (Calendrier, Rendez-vous, etc.)
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <Dashboard
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                        events={events}
                        stuckNav={stuckNav}
                    />
                );
            case 'Calendrier':
                return (
                    <Calendar onDateClick={handleDateClick} events={events} />
                );
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
                return <Settings onLogout={handleLogout} />;
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
                        onNextDay={handleNextDay} // Passer la fonction pour le jour suivant
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="home">
            <Header
                userPseudo={userPseudo}
                onShowModalClick={section => {
                    setShowModal(true);
                    setActiveModalSection(section);
                }}
                setConnectedUser={setConnectedUser}
                connectedUser={connectedUser} // Indique si l'utilisateur est connecté
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
                    <Nav
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        stuckNav={stuckNav}
                    />
                    <div
                        className={`fakeNav ${stuckNav ? 'fakeNavOn' : ''}`}
                    ></div>
                    <div className="homeSection">{renderActiveTab()}</div>
                </div>
            )}

            {showModal && (
                <div className="modalOverlay">
                    <Modal
                        setConnectedUser={setConnectedUser}
                        onClose={() => setShowModal(false)}
                        activeSection={activeModalSection}
                        onShowModalClick={section => {
                            setShowModal(true);
                            setActiveModalSection(section);
                        }}
                        addEvent={addEvent}
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
