import React, { useState, useEffect } from 'react';
import { getEvents } from '../common';
import '../styles/Dashboard.css';

function Dashboard({ onShowModalClick, stuckNav, onDateClick }) {
    const [currentMonthDays, setCurrentMonthDays] = useState([]);
    const [monthName, setMonthName] = useState('');
    const [viewType, setViewType] = useState('today');

    const handleViewChange = view => {
        setViewType(view); // Changer la vue en fonction du clic
    };
    // Fonction pour obtenir le nombre de jours dans un mois donné
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Fonction pour générer les jours du mois actuel
    const generateCurrentMonthDays = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // Mois actuel (de 0 à 11)
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);

        // Créer un tableau avec les jours du mois (1 à joursDansLeMois)
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        // Définir le mois actuel et les jours
        setCurrentMonthDays(daysArray);

        // Définir le nom du mois (en utilisant l'API `toLocaleString`)
        const monthName = today.toLocaleString('fr-FR', { month: 'long' });
        setMonthName(monthName);
    };

    // Utiliser useEffect pour exécuter la fonction quand le composant est monté
    useEffect(() => {
        generateCurrentMonthDays();
    }, []);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                if (!response.error) {
                    setEvents(response.events);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des événements',
                    error
                );
            }
        };

        fetchEvents();
    }, []);

    const handleDeleteClick = () => {
        onShowModalClick('modalDeleteEvent');
    };

    const handleModifyClick = () => {
        onShowModalClick('modalModifyEvent');
    };

    const handleCreateClick = () => {
        onShowModalClick('modalCreateEvent');
    };

    // Fonction pour vérifier si un événement existe pour un jour donné
    const hasEventOnDay = day => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // Mois actuel (de 0 à 11)

        return events.some(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === currentYear &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getDate() === day
            );
        });
    };

    return (
        <div className="dashboard">
            <div className={`dashboardTitles ${stuckNav ? 'stuckTitles' : ''}`}>
                <h3 className="dashboardTitle">Ce mois</h3>
                <h3
                    className="dashboardTitle"
                    onClick={() => handleViewChange('today')}
                >
                    <div
                        className={`circle ${viewType === 'today' ? 'activeTitle' : ''}`}
                    ></div>
                    Aujourd'hui
                    <div className="circle"></div>
                </h3>
                <div
                    className="dashboardTitle"
                    onClick={() => handleViewChange('next')}
                >
                    <div
                        className={`circle ${viewType === 'next' ? 'activeTitle' : ''}`}
                    ></div>
                    <h3>Prochains Rendez-vous</h3>
                    <div className="nextEventsBtn">
                        <span
                            className="material-symbols-rounded"
                            onClick={handleCreateClick}
                        >
                            add
                        </span>
                    </div>
                    <div className="circle"></div>
                </div>
            </div>
            <div
                className={`dashboardSections ${stuckNav ? 'dashboardSectionsScroll' : ''}`}
            >
                <div
                    className={`actualMonth ${stuckNav ? 'stuckActualMonth' : ''}`}
                >
                    <div className="dashboardMonth">
                        <div className="monthContent">
                            <h2 className="monthTitle">
                                {monthName} {new Date().getFullYear()}
                            </h2>
                            <div className="daysContainer">
                                {currentMonthDays.map(day => (
                                    <div key={day} className="day">
                                        {day}
                                        {hasEventOnDay(day) && (
                                            <div className="eventDot"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {viewType === 'today' && (
                    <div className="todayEvents">
                        <p className="noEvents">Pas d'événement aujourd'hui</p>
                    </div>
                )}

                {viewType === 'next' && (
                    <div className="nextEvents">
                        <div className="nextEventsContent">
                            {events.length > 0 ? (
                                events.map(event => (
                                    <div
                                        key={event._id}
                                        className="event nextEvent"
                                    >
                                        <h3>{event.title}</h3>
                                        <h4>
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString('fr-FR')}
                                        </h4>
                                        <p className="eventDescription">
                                            {event.description}
                                        </p>
                                        <span
                                            className="material-symbols-rounded iconEvent modify"
                                            onClick={handleModifyClick}
                                        >
                                            edit_square
                                        </span>
                                        <span
                                            className="material-symbols-rounded iconEvent delete"
                                            onClick={handleDeleteClick}
                                        >
                                            delete
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="noEvents">
                                    Aucun événement trouvé
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
