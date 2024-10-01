// utils/apiWrapper.ts

import { NextRequest } from 'next/server';
import { handleApiError } from './errorHandler';

type ApiHandler = (req: NextRequest) => Promise<Response>;

export function withErrorHandling(handler: ApiHandler): ApiHandler {
    return async (req: NextRequest) => {
        try {
            return await handler(req);
        } catch (err: any) {
            return handleApiError(err);
        }
    };
}
