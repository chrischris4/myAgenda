import '../styles/Modal.css'

function ModalUser() {
    return (
        <div className="modalUser">
            <span className="material-symbols-rounded modalClose">
close
</span>
            <div className="modalSubscribe modal">
                <h2>Crée un compte</h2>
                    <form action="">
                        <label htmlFor="">E mail</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Mot de passe</label>
                        <input type="text" name="" id="" />
                        <button>Continuer</button>
                    </form>
            </div>
            <div className="modalSignIn modal">
                <h2>Se connecter</h2>
                    <form action="">
                        <label htmlFor="">E mail</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Mot de passe</label>
                        <input type="text" name="" id="" />
                        <button>Connexion</button>
                    </form>
            </div>
            <div className="modalCreateProfil modal">
                <h2>Crée un profil</h2>
                    <form action="">
                        <label htmlFor="">Pseudo</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Image</label>
                        <input type="text" name="" id="" />
                        <button>Création du compte</button>
                    </form>
            </div>
        </div>
    )
}

export default ModalUser