import React, { useState, useEffect } from 'react';
import { getEvents } from '../common';
import '../styles/Dashboard.css';

function Dashboard({
    onShowModalClick,
    stuckNav,
    stuckDashNav,
    setEventToDelete,
    setEventToUpdate,
    onDateClick,
}) {
    const [currentMonthDays, setCurrentMonthDays] = useState([]);
    const [monthName, setMonthName] = useState('');
    const [viewType, setViewType] = useState('today');
    const [events, setEvents] = useState([]);
    const [todayEvents, setTodayEvents] = useState([]);

    const handleViewChange = view => {
        setViewType(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    // Fonction pour obtenir le nombre de jours dans un mois donné
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const hasEventOnDay = (day, monthIndex) => {
        return events.some(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === new Date().getFullYear() &&
                eventDate.getMonth() === monthIndex &&
                eventDate.getDate() === day
            );
        });
    };

    const generateCurrentMonthDays = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        let daysArray = [];

        // Ajout des divs emptyDay avant le premier jour du mois
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            daysArray.push(<div key={`empty-${i}`} className="emptyDay"></div>);
        }

        // Ajout des jours du mois
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i); // Créer une date complète
            const eventExists = hasEventOnDay(i, currentMonth);

            daysArray.push(
                <div
                    key={i}
                    className="day"
                    onClick={() => {
                        onDateClick(date);
                        window.scrollTo({ top: 0 });
                    }} // Appeler la fonction onDateClick avec la date
                >
                    {i}
                    {eventExists && (
                        <span className="eventDot"></span> // Ajouter une pastille si un événement existe
                    )}
                </div>
            );
        }

        // Met à jour les jours du mois et le nom du mois
        setCurrentMonthDays(daysArray);
        const monthName = today.toLocaleString('fr-FR', { month: 'long' });
        setMonthName(monthName);
    };

    // Utiliser useEffect pour générer les jours du mois lors du montage
    useEffect(() => {
        generateCurrentMonthDays();
    }, []); // On ne passe ici qu'une seule fois lors du montage du composant.

    // Utiliser useEffect pour récupérer les événements
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                if (!response.error) {
                    setEvents(response.events);
                    filterTodayEvents(response.events);
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

    // Appeler generateCurrentMonthDays à chaque fois que les événements sont mis à jour
    useEffect(() => {
        if (events.length > 0) {
            generateCurrentMonthDays();
        }
    }, [events]); // Réagir au changement de la variable events

    const filterTodayEvents = events => {
        const today = new Date();
        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === today.getFullYear() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getDate() === today.getDate()
            );
        });
        setTodayEvents(filteredEvents);
    };

    const handleDeleteClick = event => {
        setEventToDelete(event);
        onShowModalClick('modalDeleteEvent');
    };

    const handleModifyClick = event => {
        setEventToUpdate(event);
        onShowModalClick('modalModifyEvent');
    };

    const handleCreateClick = () => {
        onShowModalClick('modalCreateEvent');
    };

    return (
        <div className="dashboard">
            <div
                className={`dashboardTitles dashboardTitlesScroll ${stuckDashNav ? 'stuckTitlesScroll' : ''}`}
            >
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
            <div className="dashboardTitles">
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
                            <div className="weekDays">
                                {weekDays.map((day, i) => (
                                    <div key={i} className="weekDay">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="daysContainer">
                                {currentMonthDays.map((dayElement, index) => (
                                    <React.Fragment key={index}>
                                        {dayElement}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {viewType === 'today' && (
                    <div className="todayEvents">
                        {todayEvents.length > 0 ? (
                            todayEvents.map(event => (
                                <div
                                    key={event._id}
                                    className="event todayEvent"
                                >
                                    <div className="eventHours">
                                        <h4 className="eventHour">
                                            {event.startTime}
                                        </h4>
                                        <p>-</p>
                                        <h4>{event.endTime}</h4>
                                    </div>
                                    <h3>{event.title}</h3>
                                    <p className="eventDescription">
                                        {event.description}
                                    </p>
                                    <span
                                        className="material-symbols-rounded iconEvent modify"
                                        onClick={() => handleModifyClick(event)}
                                    >
                                        edit_square
                                    </span>
                                    <span
                                        className="material-symbols-rounded iconEvent delete"
                                        onClick={() => handleDeleteClick(event)}
                                    >
                                        delete
                                    </span>
                                    <span className="material-symbols-rounded iconEvent bell">
                                        notification_add
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="noEvents">
                                Aucun événement aujourd'hui
                            </p>
                        )}
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
                                        <h4>
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString('fr-FR')}
                                        </h4>
                                        <div className="eventHours">
                                            <h4 className="eventHour">
                                                {event.startTime}
                                            </h4>
                                            <p>-</p>
                                            <h4>{event.endTime}</h4>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <p className="eventDescription">
                                            {event.description}
                                        </p>
                                        <span
                                            className="material-symbols-rounded iconEvent modify"
                                            onClick={() =>
                                                handleModifyClick(event)
                                            }
                                        >
                                            edit_square
                                        </span>
                                        <span
                                            className="material-symbols-rounded iconEvent delete"
                                            onClick={() =>
                                                handleDeleteClick(event)
                                            }
                                        >
                                            delete
                                        </span>
                                        <span className="material-symbols-rounded iconEvent bell">
                                            notification_add
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
