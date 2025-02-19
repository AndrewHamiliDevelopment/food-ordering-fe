import {proxy, useSnapshot} from 'valtio';

import { Product, Category, Cart } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
    cart: Cart | null
}

export const store = proxy<Store>({products: [], categories: [], cart: null});
export const useStore = () => useSnapshot(store);
