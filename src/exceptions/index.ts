import joi from 'joi';

export interface ErrorObject {
    message: string;
    error?: Error | joi.ValidationError;
}

export class DomainError extends Error {
    error: any;
    error_name: string;

    constructor({ message = 'An error occurred', error = null }: ErrorObject) {
        super(message);
        this.name = this.constructor.name;
        this.error = error;

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor({ message = 'Resource not found', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'resource_not_found';
    }
}

export class RequestValidationError extends DomainError {
    data: any;

    constructor({ message = 'Provided data for this request is invalid', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'invalid_request';

        if (error && (error instanceof joi.ValidationError)) {
            const fieldErrors: any = {}
            error.details.forEach(errorDetail => {
                const field = fieldErrors[errorDetail.context.label] || []
                field.push(errorDetail.message);

                fieldErrors[errorDetail.context.label] = field;
            });
            this.data = fieldErrors;
        }
    }
}

export class ForbiddenActionError extends DomainError {
    constructor({ message = 'You cannot perform this action', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'resource_not_found';
    }
}

export class HttpRequestError extends DomainError {
    response: any;

    constructor({ message = 'An error occurred during the request', response = {} }: any) {
        super({ message });
        this.error_name = 'http_request_error';
        this.response = response;
    }
}

export class LockError extends DomainError {
    constructor({ message = 'An error occured while creating a new lock', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'lock_error';
    }
}

export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
