import {proxy, useSnapshot} from 'valtio';

import { Product, Category } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
}

export const store = proxy<Store>({products: [], categories: []});
export const useStore = () => useSnapshot(store);
