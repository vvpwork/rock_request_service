import mongoose from 'mongoose';
import { TypeKpiModel } from '../../types';

const kpiSchema = new mongoose.Schema<TypeKpiModel>(
  {
    price_luna: { type: String, index: true },
    price_ust: { type: String, index: true },
    ratio_luna_ust: { type: String, index: true },
    tbc: { type: String, index: true },
    tdb: { type: String, index: true },
  },
  {
    timestamps: true,
  },
);

export const KpiModel = mongoose.model<TypeKpiModel>('kpi', kpiSchema);
