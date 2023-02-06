const debugColor = '\x1b[35m%s\x1b[1m'
const infoColor = '\x1b[32m%s\x1b[1m'
const warningColor = '\x1b[33m%s\x1b[1m'
const errorColor = '\x1b[31m%s\x1b[1m'

var logTime = `>> [${new Date().toISOString()}]`

const logger = {
    debug: (msgOrErr, data) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(debugColor, `${logTime} - ${msgOrErr} `, data? data: '' )
        }
    },
    log: (msgOrErr, data) => {
        console.log(infoColor, `${logTime} : ${msgOrErr}`, data? data : '')
    },
    warn: (msgOrErr, data) => {
        console.log(warningColor, `${logTime} : ${msgOrErr}`, data? data : '')
    },
    err: (msgOrErr, data) => {
        console.log(errorColor, `${logTime} : ${msgOrErr}`, data ? data : '')
    },
}

export default logger;