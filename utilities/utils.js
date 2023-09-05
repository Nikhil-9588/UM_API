const axios = require('axios');


async function callApi(method, url, headers = {}, params = {}, data = null) {
  try {
    const config = {
      method,
      url,
      headers,
      params,
      data,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}


const config = require('./config.js');

function test() {
    const authTokens = config.auth_tokens || [];
    const authToken = authTokens[0] ? authTokens[0].token1 : undefined;
  
    const commonHeaders = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };
  
    return commonHeaders;
  }


module.exports.test = test;
module.exports.callApi = callApi;

//   const commonHeaders = test();
//   console.log(commonHeaders);