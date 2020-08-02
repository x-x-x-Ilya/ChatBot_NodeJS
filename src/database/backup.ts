const exec = require('child_process').exec;

const dbOptions =  {
  keepLastDaysBackup: 2,
  autoBackupPath: 'C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sql'
};

export const dbAutoBackUp = (): void => {
    const date = new Date();
    const newBackupDir = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + date.getDate();
    // New backup path for current backup process
    const newBackupPath = dbOptions.autoBackupPath +
      'psql-' + newBackupDir + '.sql';
    const cmd = 'pg_dump --no-password -U' + process.env.USER_NAME + ' ' +
      process.env.DB_NAME + ' > ' + newBackupPath;
    exec(cmd, { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' });
}