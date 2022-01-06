"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
class Axios {
    constructor(baseUrl, headers) {
        this.api = axios_1.default.create({
            baseURL: baseUrl,
            timeout: 20000,
            headers: Object.assign({}, headers),
        });
        this.api.interceptors.request.use(config => {
            const { baseURL, params, url } = config;
            _1.logger.info({ baseURL, params, url });
            return config;
        }, error => {
            Promise.reject(error);
        });
        this.api.interceptors.response.use(res => res.data, (err) => {
            if (err.response)
                throw new Error(err.response.data.message);
            else
                throw new Error(err.message);
        });
    }
}
exports.Axios = Axios;
