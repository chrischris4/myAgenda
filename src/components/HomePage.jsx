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
                <div className="homePageOverlay"></div>
                <img
                    src="https://i.ibb.co/DLyDM81/agenda.jpg"
                    alt=""
                    className="homePageImg"
                />
            </div>
            <div className="homePageAbout">
                <h2>Une organisation facile et rapide</h2>
                <h3>
                    Personnalisé vos rendez-vous et l'interface comme vous en
                    avez envie !
                </h3>
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
