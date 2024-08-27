import '../styles/Appointments.css'
function Appointments() {
    return (
        <div className="appointments">
            <div className='appointmentsAdd'>
            <span className="material-symbols-rounded">
add
</span><h2>Ajouter un Rendez-vous</h2>
            </div>
            <div className="appointmentsContent">
                <div className='appointment'>
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
        </div>
    )
}

export default Appointments