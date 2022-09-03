import { NextFunction, Request, Response } from 'express';
import { logger } from '@/core/utils';
import { DomainError, RequestValidationError } from '@/core/exceptions';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        logger.error(err);

        if (!err || !(err instanceof DomainError)) {
            res.status(500).json({
                error: 'server_error',
                error_description: 'A server error has occurred',
            });
        } else {
            const httpStatusCode: any = {
                server_error: 500,
                invalid_request: 400,
                resource_not_found: 404,
                http_request_error: 400,
                lock_error: 423,
                not_authenticated: 401,
                request_validation_error: 422,
                access_denied: 403,
            };
            const errorData: any = {
                error: err.error_name || 'server_error',
                error_description: err.message,
            };

            if (err instanceof RequestValidationError && err.data) {
                errorData.data = err.data;
            }

            const httpStatus = httpStatusCode[errorData.error] || 500;
            res.status(httpStatus).json(errorData);
        }
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
