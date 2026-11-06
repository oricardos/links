import api from "./api"

interface Login {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
}

export const request = {
    login: async ({ email, senha }: Login): Promise<LoginResponse> => {
        const response = await api.post('/Auth/login', {
            email,
            senha
        });

        return response.data;
    }
}