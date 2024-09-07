import '../styles/Calendar.css';

function Calendar({ onDateClick, events }) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Fonction pour déterminer le nombre de jours dans un mois donné
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate(); // Le +1 est nécessaire car les mois sont indexés de 0 à 11
    };

    const hasEventOnDay = (day, monthIndex) => {
        return events.some(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === 2024 &&
                eventDate.getMonth() === monthIndex &&
                eventDate.getDate() === day
            );
        });
    };

    const renderDays = monthIndex => {
        const days = getDaysInMonth(monthIndex, 2024);
        let daysArray = [];
        for (let i = 1; i <= days; i++) {
            const date = new Date(2024, monthIndex, i);
            const eventExists = hasEventOnDay(i, monthIndex);

            daysArray.push(
                <div
                    key={i}
                    className="day"
                    onClick={() => onDateClick(date)} // Appeler la fonction onDateClick avec la date
                >
                    {i}
                    {eventExists && (
                        <span className="eventDot"></span> // Ajouter une pastille si un événement existe
                    )}
                </div>
            );
        }
        return daysArray;
    };

    return (
        <div className="calendar">
            <div className="calendarContent">
                <div className="calendarNav">
                    <div className="calendarNavContent">
                        <span className="material-symbols-rounded">
                            arrow_back_ios
                        </span>
                        <h2>2024</h2>
                        <span className="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className="monthContainer">
                    {months.map((month, index) => (
                        <div key={index} className="month">
                            <div className="monthContent">
                                <h2 className="monthTitle">{month}</h2>
                                <div className="daysContainer">
                                    {renderDays(index)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
