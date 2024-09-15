import '../styles/Events.css';

function Event(events, onShowModalClick, setEventToDelete, setEventToUpdate) {
    const handleDeleteClick = event => {
        setEventToDelete(event);
        onShowModalClick('modalDeleteEvent');
    };

    const handleModifyClick = event => {
        setEventToUpdate(event);
        onShowModalClick('modalModifyEvent');
    };
    return (
        <div className="event">
            <h4>{eventDate}</h4>

            <h3>{eventTitle}</h3>
            <p className="eventDescription">{eventDescription}</p>
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
    );
}

export default Event;
