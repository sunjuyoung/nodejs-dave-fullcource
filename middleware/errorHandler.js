import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
    const message = `${err.name}\t${req.message}\t${req.method}\t${err.url}`;
    logEvents(message, "errors.log");
    console.log(err.stack);
  
    const status = res.statusCode ? res.statusCode : 500; //server error
  
    res.status(status);
  
    res.json({ message: err.message });
  };
  

export {errorHandler}