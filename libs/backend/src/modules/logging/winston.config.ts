import { format, transports } from 'winston';
import * as winston from 'winston';
const cls = require('cli-color');

const addPadding = (str: string, size: number) => {
  if (str.length < size) {
    const padding = size - str.length;
    for (let i = 0; i < padding; i++) {
      str = str + ' ';
    }
  }
  return str;
};

const levels = {
  levels: {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7,
    verbose: 8,
    vverbose: 9,
  },
  colors: {
    emergency: cls.redBright,
    alert: cls.redBright,
    critical: cls.redBright,
    error: cls.red,
    warn: cls.yellowBright,
    notice: cls.yellow,
    info: cls.green,
    verbose: cls.blue,
    debug: cls.white,
    vverbose: cls.magenta,
  },
};

const consoleTransport = new transports.Console({
  format: format.printf(args => {
    const { level, context, timestamp, message, stack, trace } = args;
    const color = levels.colors[level];

    let text = '';

    if (stack || trace) {
      const lines = color(stack || trace);
      text = (message ? color(message) + '\n' : '') + lines;
    } else {
      text = color(message);
    }

    const timeLog = cls.greenBright(new Date(timestamp).toLocaleString());
    const levelAndPidLog = color(`${addPadding('[' + level.toLowerCase() + ']', 11)} ${process.pid}   -`);
    const contextLog = context ? cls.yellow('[' + context + ']') : '';

    return `${levelAndPidLog} ${timeLog}   ${contextLog} ${text}`;
  }),
});

const winstonConfig: winston.LoggerOptions = {
  format: format.combine(format.errors({ stack: true }), format.timestamp()),
  // TODO: Set up log transport for production
  transports: process.env.NODE_ENV === 'production' ? [consoleTransport] : [consoleTransport],
  level: process.env.LOG_LEVEL,
  levels: levels.levels,
};

export default winstonConfig;
