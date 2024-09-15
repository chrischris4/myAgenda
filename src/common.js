import { API_ROUTES } from '../src/const';
import axios from 'axios';

///////////////USERS////////////////////////////

export function storeInLocalStorage(token, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
}

export function getFromLocalStorage(item) {
    return localStorage.getItem(item);
}

export async function createUser(data) {
    try {
        const response = await axios.post(API_ROUTES.USER, data);
        return response.data;
    } catch (err) {
        console.error(err);
        return { error: true, message: err.message };
    }
}

export const loginUser = async data => {
    try {
        const response = await axios.post(API_ROUTES.SIGN_IN, data);

        // Vérifiez le statut HTTP (200 = succès)
        if (response.status === 200) {
            const { token, userId } = response.data; // Assurez-vous que le token et userId sont dans la réponse
            storeInLocalStorage(token, userId); // Stocke le token et userId
            return response.data; // Retourner les données de l'utilisateur
        } else {
            return {
                error: response.data.error || 'Erreur lors de la connexion',
            };
        }
    } catch (error) {
        console.error('Erreur:', error);
        return { error: 'Erreur de réseau ou de serveur' };
    }
};

export async function getUserPseudo() {
    try {
        const token = getFromLocalStorage('token'); // Récupérer le token depuis le localStorage

        const response = await axios.get(API_ROUTES.USER_PSEUDO, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
            },
        });

        // Vérifiez si la réponse est correcte (status 200)
        if (response.status === 200) {
            return {
                pseudo: response.data.pseudo,
                picture: response.data.image,
            }; // Retourner le pseudo et l'image
        } else {
            return {
                error: true,
                message: 'Erreur lors de la récupération du pseudo',
            };
        }
    } catch (error) {
        console.error(
            'Erreur lors de la récupération du pseudo:',
            error.message
        );
        return {
            error: true,
            message: error.message,
        };
    }
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId');
        if (!token) {
            return defaultReturnObject;
        }
        return { authenticated: true, user: { userId, token } };
    } catch (err) {
        console.error('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}

export const updateUser = async data => {
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId');
        const response = await axios.put(`${API_ROUTES.USER}/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return {
                success: true,
                message: 'User modifié avec succès',
                event: response.data.event,
            };
        } else {
            return {
                error: true,
                message: 'Erreur lors de la modification du user',
            };
        }
    } catch (error) {
        console.error('Erreur lors de la modification du user:', error.message);
        return { error: true, message: error.message };
    }
};

export function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}

///////////////EVENTS////////////////////////////
export async function createEvent(data) {
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId'); // Récupérer userId depuis localStorage
        const response = await axios.post(
            API_ROUTES.EVENT,
            { ...data, userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error(err);
        return { error: true, message: err.message };
    }
}

export const getEvents = async () => {
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId'); // Récupérer userId depuis localStorage

        const response = await axios.get(
            `${API_ROUTES.EVENT}?userId=${userId}`,
            {
                // Ajoutez userId comme paramètre de requête
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Vérifiez si la réponse est correcte (status 200)
        if (response.status === 200) {
            return { events: response.data };
        } else {
            return {
                error: true,
                message: 'Erreur lors de la récupération des événements',
            };
        }
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des événements:',
            error.message
        );
        return {
            error: true,
            message: error.message,
        };
    }
};
export const updateEvent = async (eventId, eventData) => {
    try {
        const token = getFromLocalStorage('token');
        const response = await axios.put(
            `${API_ROUTES.EVENT}/${eventId}`,
            eventData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            return {
                success: true,
                message: 'Événement modifié avec succès',
                event: response.data.event,
            };
        } else {
            return {
                error: true,
                message: "Erreur lors de la modification de l'événement",
            };
        }
    } catch (error) {
        console.error(
            "Erreur lors de la modification de l'événement:",
            error.message
        );
        return { error: true, message: error.message };
    }
};

export const deleteEvent = async eventId => {
    try {
        const token = getFromLocalStorage('token');

        const response = await axios.delete(
            `${API_ROUTES.EVENT}/${eventId}`, // Remplace EVENT_DELETE par la route API pour supprimer un événement
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Token pour l'autorisation
                },
            }
        );

        // Vérifier si l'événement a bien été supprimé
        if (response.status === 200) {
            return { success: true, message: 'Événement supprimé avec succès' };
        } else {
            return {
                error: true,
                message: "Erreur lors de la suppression de l'événement",
            };
        }
    } catch (error) {
        console.error(
            "Erreur lors de la suppression de l'événement:",
            error.message
        );
        return {
            error: true,
            message: error.message,
        };
    }
};
