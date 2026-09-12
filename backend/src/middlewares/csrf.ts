import { NextFunction, Request, Response } from 'express'
import { CSRF_TOKEN } from '../config'
import ForbiddenError from '../errors/forbidden-error'

const CSRF_HEADER_NAME = 'x-csrf-token'

const csrfProtection = (req: Request, _res: Response, next: NextFunction) => {
    const cookieToken = req.cookies[CSRF_TOKEN.cookie.name]
    const headerToken = req.header(CSRF_HEADER_NAME)

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        return next(new ForbiddenError('Невалидный CSRF-токен'))
    }

    return next()
}

export default csrfProtection