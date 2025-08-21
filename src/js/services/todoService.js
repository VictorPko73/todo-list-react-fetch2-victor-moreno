import { BASE_URL } from "../config/components";

export const getTodosByUser = async (username) => {
    try {
        const responseData = await fetch(`${BASE_URL}/users/${username}`);
        if (!responseData.ok) {
            throw new Error(responseData.status);
        }
        const json = await responseData.json();
        return json?.todos ?? json;
    }
    catch(err) {
        console.error(`Oye, algo salio mal: ${err}`);
        throw err;
    }
}

 export const createTodo = async (userName, taskTitle) => {
    try {
        const responseData = await fetch(`${BASE_URL}/todos/${userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ label: taskTitle, is_done: false }),
        });
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

 export const deleteTodo = async (todoId) => {
    try {
        const responseData = await fetch(`${BASE_URL}/todos/${todoId}`, {
            method: 'DELETE'
        });
        if (!responseData.ok) {
            throw new Error(responseData.status);
        }
        return true;
    }
    catch(err) {
        console.error(`Oye, algo salio mal: ${err}`);
        throw err;
    }
 }
