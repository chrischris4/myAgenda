import '../styles/Modal.css';
import { useState } from 'react';
import { createEvent } from '../common';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';



function Modal({ onClose, activeSection }) {
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            date: startDate,
            title,
            description,
        };

        const response = await createEvent(eventData);

        if (!response.error) {
            // Traiter le succès, fermer la modal, ou actualiser la liste des événements
            onClose();
        } else {
            // Gérer l'erreur
            console.error(response.message);
        }
    };

    return (
        <div className="modals">
            <span className="material-symbols-rounded modalClose" onClick={onClose}>
                close
            </span>

            {activeSection === 'modalSubscribe' && (
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
            )}

            {activeSection === 'modalSignIn' && (
                <div className="modalSignIn modal">
                    <h2>Se connecter</h2>
                    <form action="">
                        <label htmlFor="">E mail</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" name="" id="" />
                        <button>Connexion</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalCreateProfil' && (
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
            )}

            {activeSection === 'modalModifyEvent' && (
                <div className="modalModifyEvent modal">
                    <h2>Modification d'un rendez-vous</h2>
                    <form action="">
                        <label htmlFor="">Date</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Titre</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" placeholder="Tapez votre texte ici..."
                        ></textarea>
                        <button>Valider</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalCreateEvent' && (
                <div className="modalCreateEvent modal">
                    <h2>Création d'un rendez-vous</h2>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="date">Date</label>
                    <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
/>
                        <label htmlFor="title">Titre</label>
                        <input type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label htmlFor="desc">Description</label>
                        <textarea name="" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tapez votre texte ici..." 
                        ></textarea>
                        <button type='submit'>Valider</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalDeleteEvent' && (
                <div className="modalDeleteEvent modal">
                    <h2>Supprimer un Rendez-vous</h2>
                    <p>Etes-vous sûr de vouloir supprimer ce rendez-vous ?</p>
                    <button>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default Modal;
