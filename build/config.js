"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.time_to_request = exports.infura_url_mainnet = exports.db_config = void 0;
const config_1 = __importDefault(require("config"));
const rpc_config = config_1.default.get('rpc');
exports.db_config = config_1.default.get('db');
exports.infura_url_mainnet = `https://mainnet.infura.io/v3/${rpc_config.infuraId}`;
exports.time_to_request = rpc_config.timeToRequest;
