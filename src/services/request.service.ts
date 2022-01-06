/* eslint-disable prefer-template */
import { CronJob } from 'cron';
import { ApiAnchorService, ApiCoinmarket, logger } from '.';
import { KpiRepository } from '../repository';
import { time_to_request } from '../config';

export class RequestService {
  private _anchor: ApiAnchorService;
  private _coin: ApiCoinmarket;
  private _kpiRepository: KpiRepository;
  private _job: CronJob;

  constructor() {
    this._anchor = new ApiAnchorService();
    this._coin = new ApiCoinmarket();
    this._kpiRepository = new KpiRepository();
    this._job = new CronJob(time_to_request, () => this._getAndSaveKpi());
  }

  private async _getAndSaveKpi() {
    try {
      const dataFromAnchorApi = await this._anchor.getMarketInfoUST();
      const dataFromCoinmarket = await this._coin.getInfoFromCoinMarket();
      const data = await this._kpiRepository.save({
        price_luna: dataFromCoinmarket?.priceLuna + '',
        price_ust: dataFromCoinmarket?.priceUST + '',
        tbc: dataFromAnchorApi?.tbc + '',
        tdb: dataFromAnchorApi?.tdb + '',
        ratio_luna_ust: dataFromCoinmarket?.ratio + '',
      });
      logger.info(data);
    } catch (err) {
      logger.error(err);
    }
  }

  startJob() {
    this._job.start();
  }

  stopJob() {
    this._job.stop();
  }
}
