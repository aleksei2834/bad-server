import { Router } from 'express'
import csrfProtection from '../middlewares/csrf'
import { validateUserUpdateSelfBody } from '../middlewares/validations'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'



const authRouter = Router()

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, validateUserUpdateSelfBody, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', login)
authRouter.post('/token', csrfProtection, refreshAccessToken)
authRouter.post('/logout', csrfProtection, logout)
authRouter.post('/register', register)

export default authRouter
