/**
 * Utilities
 * Nov 02, 2021 09:00 
 */

 const moment = require('moment');
 
 class Utilities {
     today(format = 'YYYY-MM-DD') {
         const result = moment().locale('id').format(format);
         return result;
     }
 
     convDate(val, format = 'YYYY-MM-DD') {
         const result = moment(val).locale('id').format(format);
         return result;
     }
 
    
 }
 
 module.exports = new Utilities();