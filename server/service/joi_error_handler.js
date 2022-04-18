// Get errors fron JOI
const joiErrorHandler = (data) => {
  const result = data.map((item) => item.message); // Map all errors
  return result
}

module.exports = {
  joiErrorHandler
}