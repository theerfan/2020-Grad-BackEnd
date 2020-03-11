export class ApiException extends Error {
    statusCode: number;
    jsonBody: object;
    loggableError: object;

    constructor(statusCode: number, jsonBody: object, loggableError: object) {
        super();
        this.statusCode = statusCode;
        this.jsonBody = jsonBody;
        this.loggableError = loggableError;
    }
}
