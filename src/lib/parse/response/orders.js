const parseError = require('../error')

module.exports = async (request) => {
  try {
    const response = await request

    return response
  } catch (error) {
    return parseError(error.response.body)
  }
}
