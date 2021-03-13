## NodeJS Telegram Bot API

## Installation

For work you should install:
- [PostgreSQL](https://www.postgresql.org/)
- [ngrok](https://ngrok.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)

------------
```bash
# ${DIR} - your directory for code
$ cd ${DIR}
$ git clone https://github.com/x-x-x-Ilya/ChatBot_NodeJS.git
$ cd ChatBot_NodeJS
$ npm run i
```
------------
1) Open the SQL Shell 
2) Press enter five times to connect to the DB 
3) Enter the command 
```bash
$ CREATE DATABASE ${DB_NAME};
```
4) To connect to a Database use PostgreSQL database command 
```bash
$ \c ${DB_NAME}
```
5) To install db script enter the command
```bash
$ \i \path\${DIR}\ChatBot_NodeJS\src\database\barber-shop.sql
```

## .env
- TOKEN: [bot token](https://core.telegram.org/bots#6-botfather) required from [BotFather](https://t.me/botfather) in [Telegram](https://telegram.org/)
- DB_NAME: Database name in PostgresSQL
- USER_NAME: User name for login in PostgresSQL
- DB_PASS: Password for user  in PostgresSQL
- HOST: PostgresSQL host
- EMAIL_ADDRESS: email addres for mailing
- EMAIL_PASS: password this email

## Preview
![image](https://sun9-63.userapi.com/impg/8PjgF_nJNpxHTrQo7ax5wvYg8qXJpXAF_7sRcw/n8-Cq9lWMYA.jpg?size=1920x1030&quality=96&sign=6e0553b4c5307caba83c44cd642c88bd&type=album)
