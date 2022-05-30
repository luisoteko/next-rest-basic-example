export const getNotes = async () => {
    const response = await fetch(`http://localhost:8000/notes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const createNote = async (values) => {
    const response = await fetch(`http://localhost:8000/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const updateNote = async (values) => {
    const response = await fetch(`http://localhost:8000/notes/${values.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:8000/notes/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });
    const x = response.status != 204 ? [response.status, response.json()] : [response.status, {}]
    return x;
}
export const getSharedNotes = async () => {
    const response = await fetch(`http://localhost:8000/notes/shared/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    
    return [response.status, data];
}


export const share = async (values, id) => {
    const response = await fetch(`http://localhost:8000/share/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({...values, note: id})
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const unShare = async (id) => {
    const response = await fetch(`http://localhost:8000/shares/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
    const x = response.status != 204 ? [response.status, response.json()] : [response.status, {}]
    return x;
}