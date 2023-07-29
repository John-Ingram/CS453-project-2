// Lightweight SOAP client for PartsService
// Grabs the price and delivery date for a given part number 
// from the "supplier's" SOAP server


const soap = require('soap');
const url = 'http://soapapp:8000/parts?wsdl';

// getPart returns a Promise that resolves to the price and delivery date of a part
// The Promise is resolved with the result of the SOAP call to the supplier's server
function getPart(xml) {
  return new Promise ((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(client.describe());
      client.PartsService.PartsPort.GetPartPrice(xml, function(err, result, rawResponse, soapHeader, rawRequest) {
        console.log('SOAP: ', result);
        return resolve(result)
      })
    });
  });
}

// getPartInfo wraps getPart in an async function for ease of use
const getPartInfo = async(partNumber) => {
    try {
        console.log(partNumber);
        const info = await getPart(partNumber);
        return info;
    } catch (error) {
        return error;
    }
}

module.exports = getPartInfo;
