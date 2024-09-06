import '../styles/Settings.css';
function Settings({ onLogout }) {
    return (
        <div className="settings">
            <h2>Thème</h2>
            <div className="themes">
                <div className="settingsItem theme">
                    <h3>Original</h3>
                    <div className="themeColors">
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                    </div>
                </div>
                <div className="settingsItem theme">
                    <h3>Nuit</h3>
                    <div className="themeColors">
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                    </div>
                </div>
            </div>
            <h2>Langues</h2>
            <div className="languages">
                <div className="settingsItem">
                    <h3>Français</h3>
                </div>
                <div className="settingsItem">
                    <h3>English</h3>
                </div>
            </div>
            <h2>Mon compte</h2>
            <div className="languages">
                <div className="settingsItem">
                    <h3>Modifier mon profil</h3>
                </div>
            </div>
            <button onClick={onLogout}>Se deconnecter</button>
        </div>
    );
}

export default Settings;
