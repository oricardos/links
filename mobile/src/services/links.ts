import api from "./api";

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

interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: Link[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
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
    },
    listPaged: async (page: number, pageSize: number): Promise<PaginatedResponse<Link>> => {
        const response = await api.get(`/links/paged`, {
            params: { page, pageSize }
        });

        return response.data
    }
}