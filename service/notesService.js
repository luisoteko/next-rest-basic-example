export const getNotes = async () => {
    const response = await fetch(`http://localhost:8000/notes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const createNote = async (values) => {
    const response = await fetch(`http://localhost:8000/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    const data = await response.json();
    
    return [response.status, data];
}