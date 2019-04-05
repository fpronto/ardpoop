const httpStatus = require('http-status');

class APISuccess {
    /**
     * Creates an API response.
     * @param {Any} data - data to send back.
     * @param {number} status - HTTP status code of success.
     */
    constructor(data, status = httpStatus.OK) {
        this.data = data;
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getResponse() {
        return {
            success: true,
            message: 'Success',
            code: this.status,
            data: this.data
        };
    }
}

module.exports = APISuccess;
