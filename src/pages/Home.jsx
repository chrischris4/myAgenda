import Appointment from '../components/Appointment'
import Calendar from '../components/Calendar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Nav from '../components/Nav'
import NavBar from '../components/NavBar'
import '../styles/Home.css'

function Home () {
    return(
        <div className="home">
            <Header/>
            <div className='homeContent'>
            <Nav/>
            <div className='homeSection'>
                <NavBar/>
                <Appointment/>
                <Calendar/>
            </div>
            </div>
            <Footer/>
        </div>
    )
}


export default Home