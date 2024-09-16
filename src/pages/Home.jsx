import React, { useState, useEffect } from 'react';
import {
    getEvents,
    logoutUser,
    getAuthenticatedUser,
    getUserPseudo,
    deleteEvent,
    updateEvent,
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
    const [stuckDashNav, setStuckDashNav] = useState(false);
    const [userPseudo, setUserPseudo] = useState('');
    const [userImage, setUserImage] = useState(''); // New state for user image
    const [loginValidate, setLoginValidate] = useState('');
    const [eventValidate, setEventValidate] = useState('');
    const [eventUpdated, setEventUpdated] = useState('');
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventToUpdate, setEventToUpdate] = useState(null);

    // Fonction pour afficher ou masquer le scrollToTop
    const showTopLink = () => {
        if (window.scrollY > 0) {
            setTopLink(true);
        } else {
            setTopLink(false);
        }
    };

    //ALERT///////////////////////////////////////////////////////

    useEffect(() => {
        if (loginValidate || eventValidate || eventUpdated) {
            const timer = setTimeout(() => {
                setLoginValidate(false);
                setEventValidate(false);
                setEventUpdated(false);
            }, 2000);

            // Cleanup pour éviter des effets de bord
            return () => clearTimeout(timer);
        }
    }, [loginValidate, eventValidate, eventUpdated]); // Déclenchement à chaque changement de loginValidate

    //DASHBOARDEFFECT/////////////////////////////////////////////////

    const stuckNavOn = () => {
        if (window.scrollY > 170) {
            setStuckNav(true);
        } else {
            setStuckNav(false);
        }
    };

    const stuckDashNavOn = () => {
        if (window.scrollY > 250) {
            setStuckDashNav(true);
        } else {
            setStuckDashNav(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', showTopLink);
        window.addEventListener('scroll', stuckNavOn);
        window.addEventListener('scroll', stuckDashNavOn);
        return () => {
            window.removeEventListener('scroll', showTopLink);
            window.removeEventListener('scroll', stuckNavOn);
            window.removeEventListener('scroll', stuckDashNavOn);
        };
    }, []);

    //CALLENDAR////////////////////////////////////////////////
    const handleDateClick = date => {
        setSelectedDate(date);
        setActiveTab('Jour');
    };

    //SELECTEDDAYNAV//////////////////////////////////////////////////////////
    const handlePrevDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1);
            return newDate;
        });
    };

    const handleLogout = () => {
        logoutUser();
        setConnectedUser(false);
        window.scrollTo({ top: 0 });
    };

    /////////////////////////////////////////EVENT///////////////////////////////////////
    //////ADD/////////

    const addEvent = event => {
        setEvents(prevEvents => [...prevEvents, event]);
    };

    //UPDATE////////////////////
    const handleUpdateEvent = async (eventId, updatedEventData) => {
        const response = await updateEvent(eventId, updatedEventData);
        if (response.success) {
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event._id === eventId
                        ? { ...event, ...updatedEventData }
                        : event
                )
            );
            console.log('Événement mis à jour avec succès');
        } else {
            console.error(
                "Erreur lors de la mise à jour de l'événement:",
                response.message
            );
        }
    };

    /////DELETE EVENT///////////////////////
    const handleDeleteEvent = async event => {
        console.log('Événement à supprimer:', event);
        const eventId = event._id;
        if (!eventId) {
            console.error("L'ID de l'événement est manquant");
            return;
        }
        const response = await deleteEvent(eventId); // Call the API to delete the event
        if (response.success) {
            setEvents(prevEvents => prevEvents.filter(e => e._id !== eventId)); // Remove deleted event from state
            console.log('Événement supprimé avec succès');
        } else {
            console.error(
                "Erreur lors de la suppression de l'événement:",
                response.message
            );
        }
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
                    setUserImage(pseudoResponse.picture);
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
                        stuckDashNav={stuckDashNav}
                        onDateClick={handleDateClick}
                        setEventToDelete={setEventToDelete}
                        setEventToUpdate={setEventToUpdate}
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
                        setEventToDelete={setEventToDelete}
                        setEventToUpdate={setEventToUpdate}
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
                        onPrevDay={handlePrevDay}
                        onNextDay={handleNextDay}
                        setEventToDelete={setEventToDelete}
                    />
                );
            default:
                return null;
        }
    };

    console.log(userImage);

    return (
        <div className="home">
            <Header
                userPseudo={userPseudo}
                userImage={userImage}
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
                        events={events}
                        addEvent={addEvent}
                        setLoginValidate={setLoginValidate}
                        setEventValidate={setEventValidate}
                        setEventUpdated={setEventUpdated}
                        handleDeleteEvent={handleDeleteEvent}
                        eventToDelete={eventToDelete}
                        handleUpdateEvent={handleUpdateEvent}
                        eventToUpdate={eventToUpdate}
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
            <div
                className={`alertValidate ${loginValidate ? 'showAlertValidate' : ''}`}
            >
                Bienvenue {userPseudo}!
            </div>
            <div
                className={`alertValidate ${eventValidate ? 'showAlertValidate' : ''}`}
            >
                Evenement crée avec succès !
            </div>
            <div
                className={`alertValidate ${eventUpdated ? 'showAlertValidate' : ''}`}
            >
                Evenement modifié avec succès !
            </div>
        </div>
    );
}

export default Home;
