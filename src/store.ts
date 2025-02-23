import {proxy, useSnapshot} from 'valtio';

import { Product, Category, Cart, User } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
    me: User | null;
    cart: Cart | null;
}

export const store = proxy<Store>({products: [], categories: [], me: null, cart: null});
export const useStore = () => useSnapshot(store);
