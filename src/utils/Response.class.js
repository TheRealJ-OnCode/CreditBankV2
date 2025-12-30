class Response {
    static Error(message, error, data) {
        return { message, error, data, success: false }

    }
    static Success(message, data) {
        return { message, data, success: true }
    }
};
module.exports = Response