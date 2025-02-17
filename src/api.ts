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
    private readonly axiosInstance: AxiosInstance;
    constructor(baseURL: string) {
        this.axiosInstance = axios.create({baseURL});
    }

    getProducts = async (props: {page?: number; size?: number}): Promise<AxiosResponse<Paginated<Product>>> => {
        const { page, size } = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        return await this.axiosInstance.get('/v1/products', { params })
    }
    getCategories = async (): Promise<AxiosResponse<Paginated<Category>>> => {
        return await this.axiosInstance.get('/v1/categories/tree', {})
    }
}