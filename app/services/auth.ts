import api from "./api/api";
import { jwtDecode } from "jwt-decode";

interface dataLogin {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface User {
    sub: string;
    email: string;
    iat: number;
    exp: number;
}

export const login = async (data: dataLogin): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', data);
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};

export const getCurrentUser = (): User | null => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode<User>(token) : null;
};

export const logout = (): void => {
    localStorage.removeItem('token');
};