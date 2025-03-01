import { number, object } from 'yup';


export const orderSchema = object({
    addressId: number().required('Please select an address first'),
    cartId: number().required('Please select a cart'),
    paymentMethodId: number().required('Please select a Payment Method'),
});