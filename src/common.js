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

export async function getUserDetails() {
    try {
        const token = getFromLocalStorage('token');
        const response = await axios.get(`${API_ROUTES.USER}/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Vérifiez si la réponse est correcte (status 200)
        if (response.status === 200) {
            return response.data; // Retournez les détails de l'utilisateur
        } else {
            return {
                error: true,
                message:
                    "Erreur lors de la récupération des détails de l'utilisateur",
            };
        }
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des détails de l'utilisateur:",
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
                // Ajoutez userId ici
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
