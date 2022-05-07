/**
 * Logger Configuration
 * Nov 02, 2021 09:00
 */

 const winston = require('winston');
 const DailyRotate = require('winston-daily-rotate-file');
 
 const util = require('../core/utilities.js');
 const { 
     LOG_DIR='log',
     NODE_ENV='development'
 } = process.env;
 
 class Logger {
 
     getDailyRotate(level) {
         const filename = `${LOG_DIR}/${level}/%DATE%.log`;
         const format = winston.format.combine(
             winston.format.colorize(),
             winston.format.timestamp(),
             winston.format.printf(({ level, message }) => `[${util.today('HH:mm:ss')}]: ${message}`)
         );
 
         return new DailyRotate({
             format,
             filename,
             json: false,
             maxSize: '20m',
             maxFiles: '14d',
             zippedArchive: true,
             datePattern: 'DD-MMM-YYYY'
         })
     };
 
     log({ level, color, message }) {
         if (NODE_ENV == 'development')
             console.log(color, `${level.toUpperCase()}: ${message}`);
 
         return winston.createLogger({
             level,
             transports: [
                 this.getDailyRotate(level)
             ]
         });
     };
 
     info(message, data = {}) {
         const write = JSON.stringify({
             message,
             data
         });
         const param = {
             message,
             level: 'info',
             color: '\x1b[32m%s\x1b[0m'
         };
         return this.log(param).info(write);
     };
 
     debug(message, data = {}) {
         const write = JSON.stringify({
             message,
             data
         });
         const param = {
             message,
             level: 'debug',
             color: '\x1b[34m%s\x1b[0m'
         };
         return this.log(param).debug(write);
     };
 
     warn(message, data = {}) {
         const write = JSON.stringify({
             message,
             data
         });
         const param = {
             message,
             level: 'warn',
             color: '\x1b[33m%s\x1b[0m'
         };
         return this.log(param).warn(write);
     };
 
     error(message, data = {}) {
         const write = JSON.stringify({
             message,
             data
         });
         const param = {
             message,
             level: 'error',
             color: '\x1b[31m%s\x1b[0m'
         };
         return this.log(param).error(write);
     };
 };
 
 module.exports = new Logger();