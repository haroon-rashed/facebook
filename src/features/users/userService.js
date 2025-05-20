import axios from 'axios';
const base_url = 'http://localhost:5180/api/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/register`, userData);
        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data?.error || 'Registration failed');
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/login_user`, userData);
        if (response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data?.error || 'Login failed');
    }
}

export const verifyUser = async (otpData) => {
    try {
        const response = await axios.post(`${base_url}/verify/${otpData?.id}`, otpData);
        console.log(response.data)
        console.log(otpData.id)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Verification failed');
    }
}