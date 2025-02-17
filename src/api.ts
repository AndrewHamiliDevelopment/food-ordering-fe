import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface Paginated<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
}

export interface Resource {
    id: number;
    urls: {
        info: string;
        file: string;
    }
}

export interface Category {
    name: string;
    description: string;
    thumbnail: Resource;
    enabled: boolean;
}

export interface Product {
    name: string;
    description: string;
    category: Category;
    thumbnail: Resource;
    images: Resource[];
    enabled: boolean;
}

export class Api {
    private axiosInstance: AxiosInstance;
    constructor(baseURL: string) {
        this.axiosInstance = axios.create({baseURL});
    }

    getProducts = async (): Promise<AxiosResponse<Product>> => {
        const headers = new URLSearchParams();
        return await this.axiosInstance.get('', {})
    }
    getCategories = async (): Promise<AxiosResponse<Category>> => {
        return await this.axiosInstance.get('')
    }
}