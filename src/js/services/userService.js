

export const addUser = async (userName) => {
    try {
        const responseData = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!responseData.ok) {
            throw new Error('Fallo al añandir usuario');
        }
        return await responseData.json();
    } catch (error) {
        console.error('Error al añadir usuario:', error);
    }
}

