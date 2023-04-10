const fs = require('fs')
const path = require('path')

// Define the error handling middleware
function errorHandler(err, req, res, next) {
  // Log the error in a log file
  const logFilePath = path.join(__dirname, 'error.log')
  const errorLog = `${new Date().toISOString()} - ${err.stack}\n`
  fs.appendFile(logFilePath, errorLog, err => {
    if (err) console.error(err)
  })

  // Set the response status code
  const statusCode = err.statusCode || 500

  // Send the error response to the client
  res.status(statusCode).json({
    message: err.message,
    statusCode: statusCode,
  })
}

module.exports = errorHandler
