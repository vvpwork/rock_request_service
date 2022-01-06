"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
class Logger {
    constructor() {
        this._logger = (0, pino_1.default)({
            prettyPrint: true,
            serializers: {
                err: e => ({
                    type: e.type,
                    message: e.message,
                    stack: e.stack
                })
            }
        });
    }
    info(message) {
        return this._logger.info(message);
    }
    error(message) {
        return this._logger.error(message);
    }
}
exports.logger = new Logger();
