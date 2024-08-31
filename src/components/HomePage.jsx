import '../styles/HomePage.css';

function HomePage({ setConnectedUser }) {
    return (
        <div className="homePage">
            <div className="homePageImgContainer">
                <img
                    src="https://i.ibb.co/NS360nV/myagenda.png"
                    alt=""
                    className="homePageImg"
                />
            </div>
            <div className="homePageAbout">
                <div className="homePageAboutContent">
                    <h2>Rejoignez My Agenda !</h2>
                    <h3>Une organisation facile et rapide</h3>
                    <h3>
                        Personnalisé vos rendez-vous et l'interface comme vous
                        en avez envie !
                    </h3>
                </div>
                <div className="homePageBtns">
                    <button className="homePageBtn">Crée un compte</button>
                    <button className="homePageBtn" onClick={setConnectedUser}>
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
