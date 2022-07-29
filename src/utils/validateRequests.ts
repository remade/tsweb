import { Request } from 'express';
import { RequestValidationError } from '@exceptions/index';

export const validateRequests = (schema: any, request: Request, options: any = {}) => {
    const { abortEarly = false, allowUnknown = true } = options;
    if (typeof schema === 'function') {
        schema = schema();
    }
    const { error, value } = schema.validate({ ...request.query, ...request.body }, { abortEarly, allowUnknown });

    if (error) {
        throw new RequestValidationError({
            message: undefined,
            error,
        });
    }

    return value;
};
