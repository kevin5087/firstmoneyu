"use strict";

const express = require('express');
const app = express(); //建立一個Express伺服器
const https = require('https');
const bodyParser = require("body-parser");
let name;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());


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

app.post("/rank", function(req, res) {
  
    console.log('aaaa', req.body);
    const test = Object.values(name.data);
    const id = req.body.echoText; 
    //console.log('id', Number(id));
    const mater = test.filter( number => number.rank === Number(id));
    console.log('aa', mater);  
    
    

    var speech = 
    req.body.echoText
      ? '${mater.name}:${mater.id}'
      : "Seems like some problem. Speak again.";
     
    
    return res.json({
      speech: speech,
      displayText: speech,
      source: "webhook-echo-sample"
    });

});


app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});


 