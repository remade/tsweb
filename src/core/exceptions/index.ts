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
    constructor(errorObject: ErrorObject = { message: 'resource not found' }) {
        super(errorObject);
        this.error_name = 'resource_not_found';
    }
}

export class NotAuthenticatedError extends DomainError {
    constructor(errorObject: ErrorObject = { message: 'authentication required' }) {
        super(errorObject);
        this.error_name = 'not_authenticated';
    }
}

export class RequestValidationError extends DomainError {
    data: any;

    constructor({ message = 'Provided data for this request is invalid', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'request_validation_error';

        if (error && error instanceof joi.ValidationError) {
            const fieldErrors: any = {};
            error.details.forEach(errorDetail => {
                const field = fieldErrors[errorDetail.context.label] || [];
                field.push(errorDetail.message);

                fieldErrors[errorDetail.context.label] = field;
            });
            this.data = fieldErrors;
        }
    }
}

export class ForbiddenActionError extends DomainError {
    constructor(errorObject: ErrorObject = { message: 'You cannot perform this action' }) {
        super(errorObject);
        this.error_name = 'access_denied';
    }
}
export class LockError extends DomainError {
    constructor({ message = 'An error occured while creating a new lock', error }: ErrorObject) {
        super({ message, error });
        this.error_name = 'lock_error';
    }
}
