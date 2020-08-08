import { connect } from './sequelize/synchronization';
import { Init } from './sequelize/models';
import { firebaseDatabase } from './firebase';
import { job } from './backup';

export const database = async (): Promise<void> => {
  await connect();
  await new Init();
  await firebaseDatabase();
  await job.start();
}