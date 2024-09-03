import '../styles/SelectedDaySection.css';

function SelectedDaySection({ date }) {
    // Accepter la date en prop
    const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const hours = Array.from({ length: 24 }, (_, index) => {
        const hour = index.toString().padStart(2, '0'); // Formate les heures en 2 chiffres (par exemple, 09 au lieu de 9)
        return `${hour}:00`;
    });

    return (
        <div className="selectedDay">
            <div className="selectedDayContainer">
                <div className="selectedDayNav">
                    <h2>{formattedDate}</h2> {/* Afficher la date formatée */}
                </div>
                <div className="selectedDaySection">
                    <div className="hours">
                        {hours.map((hour, index) => (
                            <div key={index} className="hour">
                                {hour}
                            </div>
                        ))}
                    </div>
                    <div className="selectedDayEvents"></div>
                </div>
            </div>
            <div className="selectedDayBtns">
                <button></button>
            </div>
        </div>
    );
}

export default SelectedDaySection;
