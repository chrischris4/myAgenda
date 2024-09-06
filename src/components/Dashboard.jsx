import React, { useState, useEffect } from 'react';
import { getEvents } from '../common';
import '../styles/Dashboard.css';

function Dashboard({ onShowModalClick }) {
    const [currentMonthDays, setCurrentMonthDays] = useState([]);
    const [monthName, setMonthName] = useState('');

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

    return (
        <div className="dashboard">
            <div className="actualMonth">
                <h3>Calendrier du moi</h3>
                <div className="dashboardMonth">
                    <div className="monthContent">
                        <h2 className="monthTitle">
                            {monthName} {new Date().getFullYear()}
                        </h2>
                        <div className="daysContainer">
                            {currentMonthDays.map(day => (
                                <div key={day} className="day">
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="nextEvents">
                <div className="nextEventsTitle">
                    <h3>Prochains Rendez-vous</h3>
                    <div className="nextEventsBtn">
                        <span className="material-symbols-rounded">add</span>
                    </div>
                </div>
                <div className="nextEventsContent">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event nextEvent">
                                <div className="eventContent">
                                    <h2>
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString('fr-FR')}
                                    </h2>
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
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
                            </div>
                        ))
                    ) : (
                        <p>Aucun événement trouvé</p>
                    )}
                </div>

                {/* Section pour les prochains événements */}
            </div>
        </div>
    );
}

export default Dashboard;
