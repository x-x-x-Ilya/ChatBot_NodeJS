// eslint-disable-next-line @typescript-eslint/no-var-requires
import database from './sequelize';
import { log } from '../../middleware/logging';

// database connect function
export async function connect(): Promise<void> {
    try {
        await database.authenticate();
        console.log('Database connection has been established successfully.');
        await database.sync();
        console.log(
            'Database synchronization has been established successfully.',
        );
    } catch (error) {
        log('./logs/_errors.txt', error, ' ');
    }
}
