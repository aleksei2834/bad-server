import { Router } from 'express'
import { validateCustomerUpdateBody } from '../middlewares/validations'
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers'
import auth from '../middlewares/auth'

const customerRouter = Router()

customerRouter.get('/', auth, getCustomers)
customerRouter.get('/:id', auth, getCustomerById)
customerRouter.patch('/:id', auth, validateCustomerUpdateBody, updateCustomer)
customerRouter.delete('/:id', auth, deleteCustomer)

export default customerRouter
