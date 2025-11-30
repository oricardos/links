import api from "./api";
import { AxiosResponse } from "axios";

interface Link {
    id?: string
    name: string;
    url: string;
    category: string;
}

interface LinkResponse {
    success: boolean;
    message: string;
    data: Link[];
}

export const request = {
    listLinks: async () => {
        const response = await api.get('/links')

        return response.data.data;
    },
    createLink: async ({ name, url, category }: Link): Promise<LinkResponse> => {
        return await api.post('/links', {
            name,
            url,
            category
        });
    },
    editLink: async ({ id, name, url, category }: Link): Promise<LinkResponse> => {
        return await api.put(`/links/${id}`, {
            name,
            url,
            category
        })
    },
    removeLink: async (linkId: number) => {
        return await api.delete(`/links/${linkId}`)
    }
}