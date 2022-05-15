/**
 * Middleware
 * Nov 02, 2021 09:00
 */

 const log  =require('../configs/logger')

 const writeReq = async (req, res, next) => {
     const {
         path,
         method
     } = req
     let ip = req.connection.remoteAddress
 
     if (ip.substr(0, 7) == "::ffff:") ip = ip.substr(7);
 
     log.info(`NEW REQUEST: (${path}) | IP: ${ip} | METHOD: ${method}`, JSON.stringify(req.body));
 
     next()
 }

 

 
 
 module.exports = {
     writeReq
 }/**
  * Middleware
  * Nov 02, 2021 09:00
  */