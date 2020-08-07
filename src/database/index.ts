import { connect } from './synchronization';
import { Init } from './models';
import { firebaseDatabase } from './firebase';
import { job } from './backup';

export const database = async (): Promise<void> => {
  await connect();
  await new Init();
  await firebaseDatabase();
  await job.start();
}