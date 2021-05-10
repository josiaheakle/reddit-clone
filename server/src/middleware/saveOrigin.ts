// WIP 
// HELPER TO MAKE LOGIN RETURN TO ORIGIN


import * as Express from "express";

function saveOrigin (req : Express.Request, res : Express.Response, next : Function) {

    var protocol = req.protocol;

    var hostHeaderIndex = req.rawHeaders.indexOf('Host') + 1;
    var host = hostHeaderIndex ? req.rawHeaders[hostHeaderIndex] : undefined;
  
    Object.defineProperty(req, 'origin', {
      get: function () {
        if (!host) {
          return req.headers.referer ? req.headers.referer.substring(0, req.headers.referer.length - 1) : undefined;
        }
        else {
          return protocol + '://' + host;
        }
      }
    });
  
    next();
  
}