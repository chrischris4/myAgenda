import { API_ROUTES } from '../src/const';
import axios from 'axios';

export async function createEvent(data) {
    try {
       const response = await axios({
          method: 'POST',
          url: `${API_ROUTES.EVENT, data}`,
       });
       return response.data;
    } catch (err) {
       console.error(err);
       return { error: true, message: err.message };
    }
 }