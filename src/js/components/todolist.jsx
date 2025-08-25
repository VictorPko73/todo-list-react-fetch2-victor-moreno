import React, { useEffect, useState } from "react";
import { getTodosByUser, createTodo, deleteTodo } from "../services/todoService";
import { addUser, getUser } from "../services/userService";

const USERNAME = 'victormoreno';

function TodoList() {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(USERNAME);
    }, []);

    useEffect(() => {
        if (!userName) return;
        const init = async () => {
            try {
                try {
                    await getUser(userName);
                } catch (_) {
                    await addUser(userName);
                }
                const todos = await getTodosByUser(userName);
                setList(todos);
            } catch (error) {
                console.error(error);
            }
        };
        init();
    }, [userName]);


    const addItem = async () => {
        const value = input.trim();
        if (!value){
            alert("¡¡¡El campo no puede estar vacío, ecribe algo para agregar tu tarea!!!")
            return;
        }
        try {
            //Crear tarea
            const created = await createTodo(userName, value);
            // La API devuelve el todo creado o toda la lista y añadimos al final
            if (created && created.id) {
                setList((prev) => [...prev, created]);
            } else {
                const todos = await getTodosByUser(userName);
                setList(todos);
            }
            setInput("");
        } catch (e) {
            console.error(e);
        }
    }

    // Eliminar tarea
    const removeItem = async (idx) => {
        const item = list[idx];
        const id = item?.id;
        // quitar de UI primero
        setList((prev) => prev.filter((_, i) => i !== idx));
        try {
            if (id) {
                await deleteTodo(id);
            } else {
                // Si no hay id, resincronizamos desde backend
                const todos = await getTodosByUser(userName);
                setList(todos);
            }
        } catch (e) {
            console.error(e);
            // Reverter si falla
            const todos = await getTodosByUser(userName);
            setList(todos);
        }
    };


    return (
        <div className="list-container">
            <h1 className="text-center mb-4">TODO LIST  DE {userName}</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Introduce tu tarea..."
                    className="input-field"
                    value={input} // Valor controlado por el estado
                    onChange={(e) => setInput(e.target.value)} // Actualiza el estado cuando cambia
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "NumpadEnter") addItem();
                    }}
                />
                <button className="add-input-button" type="submit" onClick={addItem}>
                    Agregar
                </button>
            </div>

            {list.length > 0 && (
                <ul className="app-list">
                    {list.map((item, i) => (
                        
                        <li key={item.id ?? i} className="list-item">
                            <span className="list-text">{item.label ?? item}</span>
                            <button
                                className="remove-button"
                                onClick={() => removeItem(i)}
                                aria-label={`Eliminar ${item}`}
                                type="button"
                            >
                                ✕
                            </button>
                        </li>
                        
                        
                    ))}
                </ul>
            )}
            <div>
                <p>Tienes {list.length} tareas pendientes</p>
            </div>
        </div>
    );

}

export default TodoList;