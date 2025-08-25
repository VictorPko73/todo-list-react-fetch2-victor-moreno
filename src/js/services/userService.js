import { BASE_URL } from "../config/components";

// Añadir usuario
export const addUser = async (userName) => {
    try {
        const responseData = await fetch(`${BASE_URL}/users/${userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        if (!responseData.ok) {
            throw new Error('Fallo al añadir usuario');
        }
        return await responseData.json();
    } catch (error) {
        console.error('Error al añadir usuario:', error);
        throw error;
    }
}

// Obtener usuario
export const getUser = async (userName) => {
    try {
      const responseData = await fetch(`${BASE_URL}/users/${userName}`);
      if (!responseData.ok) {
        throw new Error(responseData.status);
      }
      const json = await responseData.json();
      return json;
    }
    catch(err) {
      console.error(`Oye, algo salio mal: ${err}`);
      throw err;
    }
}





