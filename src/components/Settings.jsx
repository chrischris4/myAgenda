import '../styles/Settings.css'
function Settings() {
    return (
        <div className="settings">
            <h2>Thème</h2>
            <div className="themes">
                <div className="theme">
                    <h3>Original</h3>
                    <div className="themeColors">
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                    </div>
                </div>
                <div className="theme">
                    <h3>Nuit</h3>
                    <div className="themeColors">
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                    </div>
                </div><div className="theme">
                    <h3>Chic</h3>
                    <div className="themeColors">
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                        <div className="themeColor"></div>
                    </div>
                </div>
            </div>
            <button>Se deconnecter</button>
        </div>
    )
}

export default Settings