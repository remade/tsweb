import { RequestHandler } from 'express';
import { validateRequests } from '@/utils/validateRequests';
import { RequestValidationError } from '@/exceptions';

export default (validationSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            validateRequests(validationSchema, req);
            next()
        } catch (err) {
            if (err instanceof RequestValidationError)  {
               return res.status(422).json({
                   "message": "invalid_request",
                   "errors": err.data
               })
            } else {
                next(err)
            }
        }
    };
};

