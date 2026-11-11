import api from "./api"
import { saveToken } from "./token"

interface Login {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
}

export const request = {
    login: async ({ email, senha }: Login): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/Auth/login', {
            email,
            senha
        });

        const { token } = response.data;

        await saveToken(token);

        return response.data;
    }
}