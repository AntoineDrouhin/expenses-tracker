
var winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      timestamp: () => new Date().toLocaleString(),
      formatter: function(options) {
        return '## ' + options.timestamp() + ' '
        + options.level.toUpperCase() + ' '
        + ( options.message ? options.message : '')
        + (options.meta && Object.keys(options.meta).length ?
          ' ' + JSON.stringify(options.meta) : '')
      }
    }),
    new (winston.transports.File)({
      filename: './log.txt',
      level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug',
      timestamp: () => new Date().toLocaleString(),
      json: false,
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      formatter: function(options) {
        return '## ' + options.timestamp() + ' '
        + options.level.toUpperCase() + ' '
        + ( options.message ? options.message : '')
        + (options.meta && Object.keys(options.meta).length ?
          ' ' + JSON.stringify(options.meta) : '')
      }
    })
  ]
})

module.exports = logger
