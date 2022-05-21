/**
 * Middleware
 * Nov 02, 2021 09:00
 */

const log = require('../configs/logger');
const jsonwebtoken =  require('jsonwebtoken')
const response = require("../core/response");
require('dotenv').config();

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

const token = async (req, res, next) => {
    let token = req.header('Authorization');
    
    if (!token) {
        response.message = "Tidak ada token"
        res.send(response.getResponse());
    }

    const decode = jsonwebtoken.verify(token, process.env.ECOTOURISM_TOKEN)
    req.id_pengguna = decode.id_pengguna
    next()
 }

 

 
 
 module.exports = {
     writeReq,
     token
 }/**
  * Middleware
  * Nov 02, 2021 09:00
  */