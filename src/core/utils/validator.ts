import { RequestValidationError } from '@/core/exceptions/index';
import Joi from 'joi';
import JoiDate from '@joi/date';

const extensions = [JoiDate];

export const validator = extensions.reduce((customJoi, extension) => customJoi.extend(extension), Joi);

export const validate = (schema: any, data: any, options: any = {}) => {
    const { abortEarly = false, allowUnknown = true } = options;
    if (typeof schema === 'function') {
        schema = schema();
    }
    const { error, value } = schema.validate(data, { abortEarly, allowUnknown });

    if (error) {
        throw new RequestValidationError({
            message: 'request is invalid. please confirm you are sending correct data',
            error,
        });
    }

    return value;
};
