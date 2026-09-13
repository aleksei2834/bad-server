import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 10, // максимум 10 попыток логина за 15 минут с одного IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Слишком много попыток входа, попробуйте позже' },
})