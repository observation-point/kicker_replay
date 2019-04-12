"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _error_1 = require("@error");
class RestClient {
    constructor(baseUrl, headers) {
        this.http = axios_1.default.create({
            headers,
            baseURL: baseUrl
        });
    }
    /**
     * Query attributes of type array will be joined to string, i.e. { id: [1, 2, 3] } => '?id=1,2,3'
     *
     * @param {string} url
     * @param {object} query
     * @returns {Promise<Response>}
     */
    async get(url, query) {
        const q = {};
        for (const param in query) {
            const value = query[param];
            q[param] = Array.isArray(value) ? value.join(',') : value;
        }
        try {
            return (await this.http.get(url, { params: q })).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async post(url, body) {
        try {
            return (await this.http.post(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async put(url, body) {
        try {
            return (await this.http.put(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async patch(url, body) {
        try {
            return (await this.http.patch(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    handleError(e) {
        if (e.response) {
            const message = `HTTP request to ${e.response.config.url} failed,` +
                ` response status: ${e.response.status} ${e.response.statusText},` +
                `body: ${JSON.stringify(e.response.data)}`;
            if (422 === e.response.status) {
                return new _error_1.BadRequestError(message);
            }
            if (404 === e.response.status) {
                return new _error_1.NotFoundError(message);
            }
        }
        return e;
    }
}
exports.RestClient = RestClient;
//# sourceMappingURL=RestClient.js.map