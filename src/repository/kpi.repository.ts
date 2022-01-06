/* eslint-disable no-octal */
import { TypeKpiModel } from '../types';
import { KpiModel } from '../db/models';
import { logger } from '../services';

export class KpiRepository {
  async save(payload: TypeKpiModel) {
    try {
      const newKpi = new KpiModel(payload);
      const savedKpi = await newKpi.save();
      logger.info(savedKpi);
    } catch (err) {
      logger.error(err);
    }
  }

  async findAll() {
    try {
      const data = await KpiModel.find({
        // created_at: {
        //   $gte: new Date(2022, 1, 1),
        //   $lt: new Date(),
        // },
      })
        .sort({ createdAt: -1 })
        .limit(1000);
      return data.reverse();

    } catch (err) {
      logger.error(err);
    }
  }
}
