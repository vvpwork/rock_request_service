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
exports.ApiAnchorService = void 0;
const _1 = require(".");
const axios_service_1 = require("./axios.service");
class ApiAnchorService {
    constructor() {
        this.anchor = new axios_service_1.Axios(`https://api.anchorprotocol.com/api/v1/`);
    }
    getMarketInfoUST() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalDeposit = (yield this.anchor.api.get('/deposit'));
                const totalCollateral = (yield this.anchor.api.get('/collaterals'));
                const totalBorrow = (yield this.anchor.api.get('/borrow'));
                const tbc = this.estimateRatio(totalBorrow.total_borrowed, totalCollateral.total_value);
                const tdb = this.estimateRatio(totalDeposit.total_ust_deposits, totalBorrow.total_borrowed);
                return {
                    totalBorrow,
                    totalDeposit,
                    totalCollateral,
                    tbc,
                    tdb,
                };
            }
            catch (error) {
                _1.logger.error(error);
            }
        });
    }
    estimateRatio(firstValue, secondValue) {
        return (parseFloat(firstValue) / parseFloat(secondValue)) * 100;
    }
}
exports.ApiAnchorService = ApiAnchorService;
