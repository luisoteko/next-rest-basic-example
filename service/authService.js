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
    if (response.status == 200) {
        localStorage.setItem('token', data.token);
        getMyProfile();
    }
    return [response.status, data];
}

export const logout = async () => {
    const response = await fetch(`http://localhost:8000/authentication/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    localStorage.removeItem('token');
    return [response.status, data];
}

export const getMyProfile = async () => {
    const response = await fetch(`http://localhost:8000/authentication/profile/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return [response.status, data];
}