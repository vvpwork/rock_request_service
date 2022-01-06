import mongoose from 'mongoose';
import { logger } from '../services';
import { db_config } from '../config';

export const connectToMongo = async () => {
  try {
    const { userName, name, password, host, port } = db_config;
    const connectUrl = `mongodb://${userName}:${password}@${host}:${port}/${name}`;
    console.log(connectUrl);
    await mongoose.connect(connectUrl);
    logger.info(`Mongo connected`);
  } catch (error) {
    console.log(error);
  }
};
