import '../styles/Settings.css';
function Settings({ onLogout }) {
    return (
        <div className="settings">
            <button onClick={onLogout}>Se deconnecter</button>
        </div>
    );
}

export default Settings;
