/* eslint-disable @typescript-eslint/typedef */

import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { KpiRepository } from '../../repository';

export class KpiController {
  kpiRep: KpiRepository;

  constructor() {
    this.kpiRep = new KpiRepository();
  }

  getAllKpi = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const data = await this.kpiRep.findAll();
      return res.status(200).send({
        status: 200,
        data
      });
    } catch (error) {
      logger.error(error);
      return next(createError(501, 'Something was wrong'));
    }
  };
}
