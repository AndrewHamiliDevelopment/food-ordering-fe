import {proxy, useSnapshot} from 'valtio';

import { Product, Category, Cart, User, PaymentMethod } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    me: User | null;
    cart: Cart | null;
}

export const store = proxy<Store>({products: [], categories: [], paymentMethods: [], me: null, cart: null});
export const useStore = () => useSnapshot(store);
