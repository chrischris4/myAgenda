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

///////////////EVENTS////////////////////////////

export async function createEvent(data) {
    try {
        const response = await axios.post(API_ROUTES.EVENT, data);
        return response.data;
    } catch (err) {
        console.error(err);
        return { error: true, message: err.message };
    }
}
export const getEvents = async () => {
    try {
        const response = await axios.get(API_ROUTES.EVENT);

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
