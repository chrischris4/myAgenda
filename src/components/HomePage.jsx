import '../styles/HomePage.css';

function HomePage({ onShowModalClick }) {
    const handleSignInClick = () => {
        onShowModalClick('modalSignIn');
    };

    const handleSubscribeClick = () => {
        onShowModalClick('modalSubscribe');
    };
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
                <h3>Une organisation facile et rapide</h3>
                <h3>
                    Personnalisé vos rendez-vous et l'interface comme vous en
                    avez envie !
                </h3>
                <h2>Rejoignez My Agenda !</h2>
                <div className="homePageBtns">
                    <button onClick={handleSubscribeClick}>
                        Crée un compte
                    </button>
                    <button onClick={handleSignInClick}>Se connecter</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
