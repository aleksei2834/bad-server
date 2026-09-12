import DOMPurify from 'dompurify'

export function sanitizeComment(html: string) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
        ALLOWED_ATTR: ['href'],
        ALLOWED_URI_REGEXP: /^https?:\/\//i,
    })
}