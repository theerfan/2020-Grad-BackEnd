import {ApiException} from '../api-exception';

export class InvalidClientIdException extends ApiException {
    constructor(loggableError: any){
        super(401, {error: 'Invalid client id'}, loggableError);
    }
}
