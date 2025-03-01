import {proxy, useSnapshot} from 'valtio';

import { Product, Category, Cart, User, PaymentMethod, Address } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    me: User | null;
    cart: Cart | null;
    addresses: Address[];
}

export const store = proxy<Store>({products: [], categories: [], paymentMethods: [], me: null, cart: null, addresses: []});
export const useStore = () => useSnapshot(store);
