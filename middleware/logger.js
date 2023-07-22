import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fsPromises from 'fs/promises';
import fs from 'fs'
import path from "path"

//const fs = require('fs').promises;
const __dirname = path.resolve();

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  
    try {
      if (!fs.existsSync(path.join(__dirname,  "logs"))) {
        await fsPromises.mkdir(path.join(__dirname,  "logs"));
      }
      await fsPromises.appendFile(
        path.join(__dirname,  "logs", logFileName),
        logItem
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  const logger = (req, res, next) => {
    const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(message, "requests.log");
    console.log(`${req.method}`);
    next();
  };

  export {logger, logEvents}