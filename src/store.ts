import {proxy, useSnapshot} from 'valtio';

import { Product, Category, Cart, User, PaymentMethod, Address, Paginated, Order } from './api';


export interface Store {
    products: Product[];
    categories: Category[];
    paymentMethods: PaymentMethod[];
    me: User | null;
    cart: Cart | null;
    addresses: Address[];
    orders: Paginated<Order>
}

const defaultPaginated = {data: [], meta: {currentPage: 0, itemsPerPage: 0, totalItems: 0, totalPages: 0}};

export const store = proxy<Store>({products: [], categories: [], paymentMethods: [], me: null, cart: null, addresses: [], orders: defaultPaginated});
export const useStore = () => useSnapshot(store);
