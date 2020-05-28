const moment = require('moment')
const fs = require('fs')
const path = require('path')

// Creating Middleware
const logger = (req, res, next) => {
    
    if(!fs.exists(path.join(__dirname,'../','var/logs.txt'), (exists) => {return exists})){
        fs.mkdir(path.join(__dirname,'../','var/'),()=>{})
    }
    let logData = `protocol: ${req.protocol} \nhost: ${req.get('host')} \nUrl: ${req.originalUrl} \nDate/Time: ${moment()}\n\n` 
    fs.appendFile(path.join(__dirname,'../','var/logs.txt'), logData, () => {
        console.log(logData)
    })
        
    next()
}

module.exports = logger; 