import { number, object } from 'yup';


export const orderSchema = object({
    addressId: number().min(1).required('Please select an address'),
    cartId: number().required('Please select a cart'),
    paymentMethodId: number().required('Please select a Payment Method'),
});