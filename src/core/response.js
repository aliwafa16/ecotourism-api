/**
 * Message (RESPONSE BUILDER)
 * Nov 02, 2021 09:00
 */

 const log = require("../configs/logger");

 const messages = {
   "200": `Request Success !`,
   "101": `Invalid Parameter !`,
   "110": `Invalid Requirement !`,
   "111": `Data Unavaliable !`,
   "201": `Data already exist !`,
   "404": `Page Not Found`,
 
   100: `Invalid Username or Password !`,
 
   403: "Unathorized IP Address !",
 
   500: `Internal Server Error !`,
 };
 
 class Response {
   constructor() {
     this.message = null;
     this.code = null;
     this.data = null;
   }
 
   getResponse() {
     // set message
     const success = this.code == "200" ? true : false;
     const code = this.code || 500;
     const data = this.data || {};
     const message = this.message == null ? messages[this.code] : this.message;
 
     // empty the props
     this.message = null;
     this.data = null;
     this.code = null;
 
     const result = { code, data, success, message };
     log.info(
       `RESPONSE: (${code}) | STATUS: ${success} | MESSAGE: ${message}`,
       result
     );
 
     return result;
   }
 }
 
 module.exports = new Response();