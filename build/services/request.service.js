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
exports.RequestService = void 0;
const cron_1 = require("cron");
const _1 = require(".");
const repository_1 = require("../repository");
const config_1 = require("../config");
class RequestService {
    constructor() {
        this._anchor = new _1.ApiAnchorService();
        this._coin = new _1.ApiCoinmarket();
        this._kpiRepository = new repository_1.KpiRepository();
        this._job = new cron_1.CronJob(config_1.time_to_request, () => this._getAndSaveKpi());
    }
    _getAndSaveKpi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataFromAnchorApi = yield this._anchor.getMarketInfoUST();
                const dataFromCoinmarket = yield this._coin.getInfoFromCoinMarket();
                const data = yield this._kpiRepository.save({
                    price_luna: (dataFromCoinmarket === null || dataFromCoinmarket === void 0 ? void 0 : dataFromCoinmarket.priceLuna) + '',
                    price_ust: (dataFromCoinmarket === null || dataFromCoinmarket === void 0 ? void 0 : dataFromCoinmarket.priceUST) + '',
                    tbc: (dataFromAnchorApi === null || dataFromAnchorApi === void 0 ? void 0 : dataFromAnchorApi.tbc) + '',
                    tdb: (dataFromAnchorApi === null || dataFromAnchorApi === void 0 ? void 0 : dataFromAnchorApi.tdb) + '',
                    ratio_luna_ust: (dataFromCoinmarket === null || dataFromCoinmarket === void 0 ? void 0 : dataFromCoinmarket.ratio) + '',
                });
                _1.logger.info(data);
            }
            catch (err) {
                _1.logger.error(err);
            }
        });
    }
    startJob() {
        this._job.start();
    }
    stopJob() {
        this._job.stop();
    }
}
exports.RequestService = RequestService;
