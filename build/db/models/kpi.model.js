"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const kpiSchema = new mongoose_1.default.Schema({
    price_luna: { type: String, index: true },
    price_ust: { type: String, index: true },
    ratio_luna_ust: { type: String, index: true },
    tbc: { type: String, index: true },
    tdb: { type: String, index: true },
}, {
    timestamps: true,
});
exports.KpiModel = mongoose_1.default.model('kpi', kpiSchema);
