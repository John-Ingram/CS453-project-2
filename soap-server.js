// Lightweight SOAP server that returns a price and delivery date for a given part number

const soap = require('soap');
const express = require('express');
const app = express();

// PartsService returns a price and delivery date for a given part number
// Fortunately, every part costs $3.50 and is delivered on March 29, 2024
var partsService = {
  PartsService: {
    PartsPort: {
      GetPartPrice: function(args) {
        return {
          price: 3.50,
          deliveryDate: '2024-03-29'
        };
      }
    }
  }
};

// xml is a string that contains the WSDL definition
var xml = require('fs').readFileSync('partsservice.wsdl', 'utf8');

// start the server
app.listen(8000, function(){
  const server = soap.listen(app, '/parts', partsService, xml, function(){
    console.log('SOAP server initialized');
  });
  server.log = (type, data) => {
    console.log(`Got a ${type} with data ${data}`);
  }
});