import { Router } from 'express';
import { asyncHandler } from '../middlewares';
import { KpiController } from '../controller';


const kpiRoute = Router();
kpiRoute.get('/kpi', asyncHandler( new KpiController().getAllKpi));

export { kpiRoute };
