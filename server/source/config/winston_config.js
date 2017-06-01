var winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    // new (winston.transports.Console)( {level: 'info'}),
    new (winston.transports.Console)({
      level: 'debug',
      timestamp: () => new Date().toLocaleString(),
      formatter: function(options) {
        return options.timestamp() + ' '
        + options.level.toUpperCase() + ' '
        + ( options.message ? options.message : '')
        + (options.meta && Object.keys(options.meta).length ?
          '\n\t'+ JSON.stringify(options.meta) : '')
      }
    }),
    new (winston.transports.File)({
      filename: './log.txt',
      level: 'silly',
      timestamp: () => new Date().toLocaleString(),
      formatter: function(options) {
        return options.timestamp() + ' '
        + options.level.toUpperCase() + ' '
        + ( options.message ? options.message : '')
        + (options.meta && Object.keys(options.meta).length ?
          '\n\t'+ JSON.stringify(options.meta) : '')
      }
    })
  ]
})

module.exports = logger
