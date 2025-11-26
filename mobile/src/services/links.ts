import api from "./api";

interface Link {
    name: string;
    url: string;
    category: string;
}

export const request = {
    listLinks: async () => {
        const response = await api.get('/links')

        return response.data.data;
    },
    //TODO MELHORAR ESSA TIPAGEM
    createLink: async (name: string, url: string, category: string) => {
        return await api.post('/links', {
            name,
            url,
            category
        });
    },
    editLink: async (id: number, name: string, url: string, category: string) => {
        return await api.put(`/links/${id}`, {
            id: id,
            name,
            url,
            category
        })
    },
    removeLink: async (linkId: number) => {
        return await api.delete(`/links/${linkId}`)
    }
}