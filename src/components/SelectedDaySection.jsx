import '../styles/SelectedDaySection.css';

function SelectedDaySection({
    date,
    events,
    onPrevDay,
    onNextDay,
    onShowModalClick,
}) {
    // Accepter la date en prop
    const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const eventsForSelectedDate = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
        );
    });

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
        <div className="selectedDaySection">
            <div className="selectedDayNavBtn">
                <div className="selectedDayNav">
                    <div className="selectedDayNavContent">
                        <span
                            className="material-symbols-rounded"
                            onClick={onPrevDay} // Gérer le clic pour le jour précédent
                        >
                            arrow_back_ios
                        </span>
                        <h3>{formattedDate}</h3>
                        <span
                            className="material-symbols-rounded"
                            onClick={onNextDay} // Gérer le clic pour le jour suivant
                        >
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className="selectedDayBtn" onClick={handleAddClick}>
                    <span className="material-symbols-rounded iconEvent">
                        add
                    </span>
                    <h3>Ajouter un Rendez-vous</h3>
                </div>
            </div>
            <div className="selectedDay">
                <div className="selectedDayEvents">
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map(event => (
                            <div key={event._id} className="event">
                                <h3>{event.title}</h3>
                                <p className="eventDate">
                                    {new Date(event.date).toLocaleTimeString(
                                        'fr-FR'
                                    )}
                                </p>
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
                            Aucun événement pour cette journée
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectedDaySection;
