const axios = require('axios');
const utils = require('../utilities/utils'); // Assuming you have a utils.js file for test() function

class Base {
  async getCommonHeaders() {
    try {
       
      return await utils.test();
      
    } catch (error) {
       
      throw new Error("Config file not found: 'config/config.js'");
    }
  }

  async responseHandle(response) {
    const contentType = response.headers['content-type'] || '';
    const statusCode = response.status; // Get the status code

    if (contentType.includes('application/json')) {
      return [statusCode, await response.data];
    } else if (contentType.includes('text/html')) {
      return [statusCode, await response.text];
    } else {
      return [statusCode, await response.data];
    }
  }
}

module.exports = Base;


const baseInstance = new Base(); // Create an instance of the Base class
baseInstance.getCommonHeaders() // Call the getCommonHeaders method
  .then(commonHeaders => {
    console.log(commonHeaders);
  })
  .catch(error => {
    console.error(error.message);
  });