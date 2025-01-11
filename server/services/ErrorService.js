class ErrorService extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorService(404, message)
    }

    static internal(message) {
        return new ErrorService(500, message)
    }

    static forbidden(message) {
        return new ErrorService(403, message)
    }
}

module.exports = ErrorService;