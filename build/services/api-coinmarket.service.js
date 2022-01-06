"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCoinmarket = void 0;
const _1 = require(".");
const axios_service_1 = require("./axios.service");
class ApiCoinmarket {
    constructor() {
        this.coin = new axios_service_1.Axios('https://pro-api.coinmarketcap.com', {
            'X-CMC_PRO_API_KEY': '4dac9e9d-b5d5-4efd-b34a-27e1f9f48393',
        });
    }
    getInfoFromCoinMarket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const terraLuna = yield this.coin.api.get(`/v1/cryptocurrency/quotes/latest`, {
                    params: {
                        symbol: `luna,ust`,
                    },
                });
                const { LUNA, UST } = terraLuna.data;
                const ratio = this.estimateRatio(LUNA.quote.USD.market_cap, UST.quote.USD.market_cap);
                return {
                    ratio: ratio.toFixed(2),
                    priceLuna: LUNA.quote.USD.price.toFixed(2),
                    priceUST: UST.quote.USD.price.toFixed(2),
                };
            }
            catch (err) {
                _1.logger.error(err);
            }
        });
    }
    estimateRatio(lunaCap, ustCap) {
        return (parseFloat(lunaCap) / parseFloat(ustCap)) * 100;
    }
}
exports.ApiCoinmarket = ApiCoinmarket;
