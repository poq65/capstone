//log module
var winston = require('winston');
var moment = require('moment-timezone');
var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      level: 'debug',
      silent: false,
      colorize: true,
      prettyPrint: true,
      timestamp: function() {
        return moment().tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss'); // '2014-07-03 20:14:28.500 +0900'
      }
    }),
    new(require('winston-daily-rotate-file'))({
      level: 'info',
      json: true,
      filename: '/home/ubuntu/',
      datePattern: 'yyyy-MM-dd.log',
      timestamp: function() {
        return moment().tz("Asia/Seoul").format('YYYY-MM-DD HH:mm:ss');
      }
    })
  ]
});

module.exports = logger;