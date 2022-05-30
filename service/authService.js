export const signUp = async (values) => {
    const response = await fetch(`http://localhost:8000/authentication/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    const data = await response.json();
    
    return [response.status, data];
}

export const login = async (values) => {
    const response = await fetch(`http://localhost:8000/authentication/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return [response.status, data];
}