import { connect } from './sequelize/synchronization';
import { Init } from './sequelize/models';
import { job } from './backup';

// start point for databases
export const database = async (): Promise<void> => {
    await connect();
    await new Init();
    await job.start();
};
