const url = process.env.NEXT_PUBLIC_API_URL
export const signUp = async (values) => {
    const response = await fetch(`${url}/authentication/register/`, {
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
    values['login'] = values['login'].toLowerCase();
    const response = await fetch(`${url}/authentication/login/`, {
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
    const response = await fetch(`${url}/authentication/logout/`, {
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
    const response = await fetch(`${url}/authentication/profile/`, {
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