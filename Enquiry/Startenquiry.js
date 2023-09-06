const axios = require('axios');
const utils = require('../utilities/utils');// Assuming you have utils.js for callApi() and responseHandle()
const read = require('../utilities/read'); 
const Base = require('./Base'); // Assuming you have Base.js for getCommonHeaders()

class StartEnquiry {
  constructor() {
    this.endPoint = '/wbd/eoi/v1/ume/v4/startEnquiry';
    this.params = { branch: 'PLGroupBen', tag: 'EOI_v12', embed: true };
    this.baseInstance = new Base();
   
  }

  apiURL() {
    try {
      const config = require('../utilities/config.js'); // Import the config.js file
      const baseUrl = config.baseUrl || ''; // Access the baseUrl property from config
      if (baseUrl) {
        const url = baseUrl + this.endPoint;
        return url;
      } else {
        throw new Error("Base URL not defined in 'config.js'");
      }
    } catch (error) {
      throw new Error(`Config file not found: 'utilities/config.js' - ${error.message}`);
    }
  }
  

  async getParams() {
   
    //const headers = await this.baseInstance.getCommonHeaders();
    //console.log(headers)
    //const url = "https://dev.us1.api.pacificlife.com/wbd/eoi/v1/ume/v4/startEnquiry?branch=PLGroupBen&tag=EOI_v12&embed=true"
    return this.params;
    //return url

  }

  async data()
  {
    return await read.readCsvRows(2)
    //const dataList= await read.readCsvRows(2)
    //console.log(dataList)


  }
  

  async startEnquiry() {
    const url = this.apiURL();
    const url1 = "https://dev.us1.api.pacificlife.com/wbd/eoi/v1/ume/v4/startEnquiry?branch=PLGroupBen&tag=EOI_v12&embed=true"
    console.log(url); // Check this print statement
    const headers = await this.baseInstance.getCommonHeaders();
    const params = await this.getParams();
    //console.log(params)

    const dataList = await this.data()
    console.log(dataList[0])


    const requestData = {
         "answers": dataList[0],
        "username": "email|64da210e646ac49286074055"
    }

    const response = await utils.callApi('POST', url, headers , params,  requestData);
    const [statusCode, responseContent] = await this.baseInstance.responseHandle(response);
    console.log(statusCode)
    console.log(response)
    const enquiryId = responseContent.enquiryId;
    return [statusCode, enquiryId];
    
  }
}

module.exports = StartEnquiry;

const startEnquiryInstance = new StartEnquiry();

// Call the apiURL() function to get the API URL
//const apiUrl = startEnquiryInstance.apiURL();
startEnquiryInstance.startEnquiry()
//console.log(apiUrl); // This will print the API URL
//startEnquiryInstance.getParams()
//startEnquiryInstance.data()