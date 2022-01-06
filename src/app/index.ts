/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { logger, RequestService } from '../services';
import { connectToMongo } from '../db';
import server from '../server';
import { port } from '../config';

const request = new RequestService();

const app = async () => {
  try {
    await connectToMongo();
    request.startJob();
    server.listen(port, () => {
      logger.info(`Server start on port ${port}`);
    });
  } catch (error: any) {
    logger.error(error);
    request.stopJob();
  }
};

app();
