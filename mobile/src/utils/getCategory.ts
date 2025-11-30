import { categories } from "./categories";

export const getCategory = (category: string) => {
    return categories.find(cat => cat.name === category)
}