import '../styles/Events.css'
function Events({ onShowModalClick }) {

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
            <div className='eventsAdd'>
            <span className="material-symbols-rounded iconEvent" onClick={handleAddClick}>
add
</span><h2>Ajouter un Rendez-vous</h2>
            </div>
            <div className="eventsContent">
                <div className='event'>
            <h2>Mercredi 22 septembre 2024</h2>
            <h3>Rdv france travail</h3>
            <div className='eventLine'></div>
            <p>Ne pas oublier de faire les recherches de stage avant le rdv ! </p>
            <span className="material-symbols-rounded iconEvent modify" onClick={handleModifyClick}>
            edit_square
</span>
            <span className="material-symbols-rounded iconEvent delete" onClick={handleDeleteClick}>
delete
</span>
            </div>
            </div>
        </div>
    )
}

export default Events