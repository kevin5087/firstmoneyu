"use strict";


const express = require('express');
const app = express(); //建立一個Express伺服器
const https = require('https');
let name;




https.get('https://api.coinmarketcap.com/v2/ticker/', (resp) => {
  let data = '';  
// A chunk of data has been recieved.
resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
resp.on('end', () => {
    //console.log( JSON.parse(data));
    name = JSON.parse(data);
   
  });
 
}).on("error", (err) => {
    console.log("Error: " + err.message);

});

app.post("/rank/:id", function(req, res) {
    // console.log('xxxxxxxxx', name);
    //var speech =
    //req.body.result.parameters.id;
    
    const test = Object.values(name.data);
    const id = req.params.id; 
    console.log('id', Number(id));
    const mater = test.filter( number => number.rank === Number(id));
    console.log('aa', mater);  
    
    return res.json({
      speech: mater,
      displayText: master,
      source: "webhook-echo-sample"
    });
});





  app.listen(3000, function () {
    console.log('Example app is running on port 3000!');}
  );