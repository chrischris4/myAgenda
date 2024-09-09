import '../styles/Events.css';
import { useEffect, useState } from 'react';
import { getEvents } from '../common'; // Créez une fonction pour récupérer les événements

function Events({ onShowModalClick }) {
    const [eventsByDate, setEventsByDate] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                if (!response.error) {
                    const groupedAndSortedEvents = groupAndSortEventsByDate(
                        response.events
                    );
                    setEventsByDate(groupedAndSortedEvents);
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

    const formatDate = dateString => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    // Fonction pour regrouper et trier les événements par date
    const groupAndSortEventsByDate = events => {
        const groupedEvents = events.reduce((acc, event) => {
            const eventDate = new Date(event.date);
            if (isNaN(eventDate)) return acc; // Ignorer les événements avec des dates invalides

            const formattedDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`; // Groupement par année, mois, jour

            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push(event);
            return acc;
        }, {});

        // Convertir l'objet en tableau et trier les dates (décroissant)
        const sortedEvents = Object.keys(groupedEvents)
            .sort((a, b) => new Date(a) - new Date(b)) // Trier par date décroissante
            .map(date => ({ date, events: groupedEvents[date] }));

        return sortedEvents;
    };

    const handleAddClick = () => {
        onShowModalClick('modalCreateEvent');
    };

    const handleDeleteClick = () => {
        onShowModalClick('modalDeleteEvent');
    };

    const handleModifyClick = () => {
        onShowModalClick('modalModifyEvent');
    };

    return (
        <div className="events">
            <div className="eventsAdd">
                <span
                    className="material-symbols-rounded iconEvent"
                    onClick={handleAddClick}
                >
                    add
                </span>
                <h3>Ajouter un Rendez-vous</h3>
            </div>
            {eventsByDate.length > 0 ? (
                <div className="eventsByDay">
                    {eventsByDate.map(({ date, events }) => (
                        <div key={date} className="eventDayColumn">
                            <h2>{formatDate(date)}</h2>
                            {events.map(event => (
                                <div key={event._id} className="event">
                                    <h3>{event.title}</h3>
                                    <h4>10 : 10 - 11 : 10</h4>
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
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun événement trouvé</p>
            )}
        </div>
    );
}

export default Events;
