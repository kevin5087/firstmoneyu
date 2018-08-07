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
  
    const id = req.body.echoText;
    const test = Object.values(name.data);
    const mater = test.filter( number => number.rank === Number(id));
    console.log(typeof mater);
    console.log('asdff', JSON.stringify(mater));
    const mma = mater[0].name;
    console.log('aaaaa', mma);
    
    
    //console.log('aaa', mater);
    //const ans = JSON.stringify(mater);
    //const loby = JSON.stringify(mater.rank);
    //console.log('aaaaa', ans);
    
    

    var speech = mma ;


     
    
    return res.json({
      speech: speech,
      displayText: speech,
      source: "webhook-echo-sample"
    });

});


app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});


 