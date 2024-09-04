import '../styles/Events.css';
import { useEffect, useState } from 'react';
import { getEvents } from '../common'; // Créez une fonction pour récupérer les événements

function Events({ onShowModalClick }) {
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
                <h2>Ajouter un Rendez-vous</h2>
            </div>
            <div className="eventsContent">
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event._id} className="event">
                            <h2>
                                {new Date(event.date).toLocaleDateString(
                                    'fr-FR'
                                )}
                            </h2>
                            <h3>{event.title}</h3>
                            <div className="eventLine"></div>
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
                    ))
                ) : (
                    <p>Aucun événement trouvé</p>
                )}
            </div>
        </div>
    );
}

export default Events;
