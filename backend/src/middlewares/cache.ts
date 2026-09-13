import { NextFunction, Request, Response } from 'express'

interface CacheEntry {
    body: unknown
    expiresAt: number
}

const cacheStore = new Map<string, CacheEntry>()

export default function cacheMiddleware(ttlMs: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = req.originalUrl
        const cached = cacheStore.get(key)

        if (cached && cached.expiresAt > Date.now()) {
            return res.json(cached.body)
        }

        const originalJson = res.json.bind(res)
        res.json = (body: unknown) => {
            cacheStore.set(key, { body, expiresAt: Date.now() + ttlMs })
            return originalJson(body)
        }

        return next()
    }
}

export function invalidateCache(urlPrefix: string) {
    Array.from(cacheStore.keys())
        .filter((key) => key.startsWith(urlPrefix))
        .forEach((key) => cacheStore.delete(key))
}