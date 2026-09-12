import { adapterOrderFromServer } from '../../utils/adapterOrderFromServer';
import { RootState } from '../store';


export const selectOrderByNumber =
    (orderNumber: number) => (state: RootState) => {
        if (state.orders.orderSelected?.orderNumber === orderNumber) {
            return state.orders.orderSelected
        }
        if (state.orders.ordersData.length) {
            const data = state.orders.ordersData.find(
                (item) => item.orderNumber === orderNumber
            )
            return data ? adapterOrderFromServer(data) : null
        }
        if (state['profile-orders'].ordersData.length) {
            const data = state['profile-orders'].ordersData.find(
                (item) => item.orderNumber === orderNumber
            )
            return data ? adapterOrderFromServer(data) : null
        }
        return null
    }

export const selectCustomerById =
    (customerId: string) => (state: RootState) => {
        if (state.customers.customersData.length) {
            const data = state.customers.customersData.find(
                (item) => item.id === customerId
            )
            return data ? data : null
        }
        return null
    }
