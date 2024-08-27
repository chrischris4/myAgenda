import '../styles/Appointment.css'
function Appointment() {
    return (
        <div className="appointment">
            <div className="appointmentContent">
            <h2>Appointment title</h2>
            <h3>date</h3>
            <p>Desciption</p>
            <div className="iconAppointment modify">
                d
            </div>
            <div className="iconAppointment delete">
                m
            </div>
            </div>
        </div>
    )
}

export default Appointment