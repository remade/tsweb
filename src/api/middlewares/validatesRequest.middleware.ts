import { RequestHandler } from 'express';
import { validate } from '@/core/utils/validator';

export default (validationSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            validate(validationSchema, { ...req.body, ...req.query, ...req.params });
            next();
        } catch (err) {
            next(err);
        }
    };
};
