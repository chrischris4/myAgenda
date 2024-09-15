import '../styles/Modal.css';
import { useState, useEffect } from 'react';
import { createEvent, createUser, loginUser } from '../common';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Modal({
    onClose,
    activeSection,
    onShowModalClick,
    setConnectedUser,
    addEvent,
    setLoginValidate,
    setEventValidate,
    handleDeleteEvent,
    eventToDelete,
    handleUpdateEvent,
    eventToUpdate,
    setEventUpdated,
}) {
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [password, setPassword] = useState('');

    /////////////////////////USER///////////////////////////////////////

    //SIGNIN//////////////////////////////////////////
    const handleSubmitSignIn = async e => {
        e.preventDefault();

        const userData = {
            email: document.getElementById('emailSignIn').value, // Récupérer l'email
            password: document.getElementById('passwordSignIn').value, // Récupérer le mot de passe
        };

        const response = await loginUser(userData);

        if (!response.error) {
            console.log('Connexion réussie:', response);

            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', response.token);

            setLoginValidate(true);
            setConnectedUser(true);
            window.scrollTo({ top: 0 });
            onClose(); // Fermer la modal après connexion
        } else {
            // Gérer les erreurs de connexion
            console.error(response.error);
            alert('Erreur de connexion: ' + response.error);
        }
    };

    //CREATE///////////////////////////////////////
    // Pour gérer la sélection d'image
    const handlePictureChange = e => {
        const file = e.target.files[0]; // Récupère le premier fichier sélectionné
        setPicture(file); // Stocke l'objet `File`
    };
    const handleSubmitUser = async e => {
        e.preventDefault();

        const formData = new FormData(); // Créer une nouvelle instance de FormData
        formData.append('pseudo', pseudo);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('picture', picture); // Ajouter l'image sélectionnée

        const response = await createUser(formData); // Envoyer le formData

        if (!response.error) {
            onClose(); // Fermer la modal si le succès
        } else {
            console.error(response.message);
        }
    };

    //PROFIL/////////////////////////////////////////////

    const handleModalCreateProfilClick = e => {
        e.preventDefault(); // Empêcher le rafraîchissement de la page

        if (email && password) {
            onShowModalClick('modalCreateProfil');
        } else {
            console.error('Email et mot de passe sont requis');
        }
    };

    //////////////////////////////////////EVENT//////////////////////////////////////

    //CREATE//////////////////////////////////////////////////////

    const handleSubmit = async e => {
        e.preventDefault();
        const formattedDate = startDate.toISOString();

        const eventData = {
            date: formattedDate,
            title,
            description,
        };

        const response = await createEvent(eventData);

        if (!response.error) {
            addEvent({
                date: formattedDate,
                title,
                description,
                _id: response.eventId,
            });
            setEventValidate(true);
            onClose();
        } else {
            // Gérer l'erreur
            console.error(response.message);
        }
    };

    //UPDATE/////////////////////////////////////////

    const handleSubmitUpdateEvent = async e => {
        e.preventDefault();
        const updatedEventData = {
            date: startDate.toISOString(),
            title,
            description,
        };
        await handleUpdateEvent(eventToUpdate._id, updatedEventData);
        setEventUpdated(true);
        onClose();
    };

    useEffect(() => {
        if (eventToUpdate) {
            setStartDate(new Date(eventToUpdate.date)); // Pré-remplir la date
            setTitle(eventToUpdate.title); // Pré-remplir le titre
            setDescription(eventToUpdate.description); // Pré-remplir la description
        }
    }, [eventToUpdate]);

    //DELETE///////////////////////////////////////////////

    const confirmDelete = async () => {
        if (eventToDelete) {
            await handleDeleteEvent(eventToDelete); // Use the prop function instead
            onClose(); // Optionally close the modal
        } else {
            console.error('No event to delete'); // Handle case when no event is set
        }
    };

    return (
        <div className="modals">
            <span
                className="material-symbols-rounded modalClose"
                onClick={onClose}
            >
                close
            </span>

            {activeSection === 'modalSubscribe' && (
                <div className="modalSubscribe modal">
                    <h2>Crée un compte</h2>
                    <form>
                        <label htmlFor="">E mail</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Mot de passe</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button onClick={handleModalCreateProfilClick}>
                            Continuer
                        </button>
                    </form>
                </div>
            )}

            {activeSection === 'modalCreateProfil' && (
                <div className="modalCreateProfil modal">
                    <h2>Crée un profil</h2>
                    <form onSubmit={handleSubmitUser}>
                        <label htmlFor="pseudo">Pseudo</label>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            value={pseudo}
                            onChange={e => setPseudo(e.target.value)}
                        />
                        <label htmlFor="">Choisissez une image</label>
                        <div className="freePictures">
                            <div className="freePicture">
                                <img
                                    src="https://i.ibb.co/S75R4wb/dog-3093482.png"
                                    alt=""
                                />
                            </div>
                            <div className="freePicture">
                                {' '}
                                <img
                                    src="https://i.ibb.co/S75R4wb/dog-3093482.png"
                                    alt=""
                                />
                            </div>
                            <div className="freePicture">
                                {' '}
                                <img
                                    src="https://i.ibb.co/S75R4wb/dog-3093482.png"
                                    alt=""
                                />
                            </div>
                            <div className="freePicture">
                                {' '}
                                <img
                                    src="https://i.ibb.co/S75R4wb/dog-3093482.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <label htmlFor="">Ou importez votre fichier</label>
                        <input
                            className="inputPicture"
                            type="file"
                            name="picture"
                            id="picture"
                            onChange={handlePictureChange} // Gérer le changement de fichier
                            accept="image/*"
                        />
                        <button type="submit">Création du compte</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalSignIn' && (
                <div className="modalSignIn modal">
                    <h2>Se connecter</h2>
                    <form onSubmit={handleSubmitSignIn}>
                        <label htmlFor="">E mail</label>
                        <input type="text" name="" id="emailSignIn" required />
                        <label htmlFor="">Mot de passe</label>
                        <input
                            type="password"
                            name=""
                            id="passwordSignIn"
                            required
                        />
                        <button type="submit">Connexion</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalModifyEvent' && (
                <div className="modalModifyEvent modal">
                    <h2>Modification d'un rendez-vous</h2>
                    <form onSubmit={handleSubmitUpdateEvent}>
                        <label htmlFor="date">Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                        <label htmlFor="">Titre</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label htmlFor="desc">Description</label>
                        <textarea
                            name=""
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Tapez votre texte ici..."
                        ></textarea>
                        <button type="submit">Valider</button>
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
                            onChange={date => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label htmlFor="desc">Description</label>
                        <textarea
                            name=""
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Tapez votre texte ici..."
                        ></textarea>
                        <button type="submit">Valider</button>
                    </form>
                </div>
            )}

            {activeSection === 'modalDeleteEvent' && (
                <div className="modalDeleteEvent modal">
                    <h2>Supprimer un Rendez-vous</h2>
                    <p>Etes-vous sûr de vouloir supprimer ce rendez-vous ?</p>
                    <button onClick={confirmDelete}>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default Modal;
