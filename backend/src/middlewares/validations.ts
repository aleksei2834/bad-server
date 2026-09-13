import { Joi, celebrate } from 'celebrate'
import { Types } from 'mongoose'

// eslint-disable-next-line no-useless-escape
export const phoneRegExp = /^\+?[\d\s\-()]{5,20}$/

export enum PaymentType {
    Card = 'card',
    Online = 'online',
}

// валидация id
export const validateOrderBody = celebrate({
    body: Joi.object().keys({
        items: Joi.array()
            .items(
                Joi.string().custom((value, helpers) => {
                    if (Types.ObjectId.isValid(value)) {
                        return value
                    }
                    return helpers.message({ custom: 'Невалидный id' })
                })
            )
            .messages({
                'array.empty': 'Не указаны товары',
            }),
        payment: Joi.string()
            .valid(...Object.values(PaymentType))
            .required()
            .messages({
                'string.valid':
                    'Указано не валидное значение для способа оплаты, возможные значения - "card", "online"',
                'string.empty': 'Не указан способ оплаты',
            }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Не указан email',
        }),
        phone: Joi.string().required().pattern(phoneRegExp).messages({
            'string.empty': 'Не указан телефон',
        }),
        address: Joi.string().required().max(200).messages({
            'string.empty': 'Не указан адрес',
            'string.max': 'Адрес слишком длинный',
        }),
        total: Joi.number().required().messages({
            'string.empty': 'Не указана сумма заказа',
        }),
        comment: Joi.string().optional().allow('').max(1000).messages({
            'string.max': 'Комментарий слишком длинный',
        }),
    }),
})

// валидация товара.
// name и link - обязательные поля, name - от 2 до 30 символов, link - валидный url
export const validateProductBody = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
            'string.empty': 'Поле "title" должно быть заполнено',
        }),
        image: Joi.object().keys({
            fileName: Joi.string().required(),
            originalName: Joi.string().required(),
        }),
        category: Joi.string().required().max(50).messages({
            'string.empty': 'Поле "category" должно быть заполнено',
            'string.max': 'Категория слишком длинная',
        }),
        description: Joi.string().required().max(500).messages({
            'string.empty': 'Поле "description" должно быть заполнено',
            'string.max': 'Описание слишком длинное'
        }),
        price: Joi.number().allow(null),
    }),
})

export const validateProductUpdateBody = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
        }),
        image: Joi.object().keys({
            fileName: Joi.string().required(),
            originalName: Joi.string().required(),
        }),
        category: Joi.string().max(50),
        description: Joi.string().max(500),
        price: Joi.number().allow(null),
    }),
})

export const validateObjId = celebrate({
    params: Joi.object().keys({
        productId: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (Types.ObjectId.isValid(value)) {
                    return value
                }
                return helpers.message({ any: 'Невалидный id' })
            }),
    }),
})

export const validateUserBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
        }),
        password: Joi.string().min(6).max(100).required().messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
        email: Joi.string()
            .required()
            .email()
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
                'string.empty': 'Поле "email" должно быть заполнено',
            }),
    }),
})

export const validateUserUpdateSelfBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        phone: Joi.string().pattern(phoneRegExp),
    }),
})

export const validateCustomerUpdateBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        phone: Joi.string().pattern(phoneRegExp),
    }),
})

export const validateAuthentication = celebrate({
    body: Joi.object().keys({
        email: Joi.string()
            .required()
            .email()
            .max(100)
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
                'string.required': 'Поле "email" должно быть заполнено',
            }),
        password: Joi.string().required().messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
    }),
})

export const validateGetCustomersQuery = celebrate({
    query: Joi.object().keys({
        page: Joi.number().min(1),
        limit: Joi.number().min(1),
        sortField: Joi.string().valid('createdAt', 'totalAmount', 'lastOrderDate'),
        sortOrder: Joi.string().valid('asc', 'desc'),
        registrationDateFrom: Joi.string(),
        registrationDateTo: Joi.string(),
        lastOrderDateFrom: Joi.string(),
        lastOrderDateTo: Joi.string(),
        totalAmountFrom: Joi.number(),
        totalAmountTo: Joi.number(),
        orderCountFrom: Joi.number(),
        orderCountTo: Joi.number(),
        search: Joi.string().max(100),
    }),
})
