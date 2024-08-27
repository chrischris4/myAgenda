import '../styles/Appointment.css'
function Appointment() {
    return (
        <div className="appointment">
            <div className="appointmentContent">
            <h2>Appointment title</h2>
            <h3>date</h3>
            <p>Desciption</p>
            <div className="iconAppointment modify">
            <span className="material-symbols-rounded">
delete
</span>
            </div>
            <div className="iconAppointment delete">
            <span className="material-symbols-rounded">
edit_square
</span>
            </div>
            </div>
        </div>
    )
}

export default Appointment