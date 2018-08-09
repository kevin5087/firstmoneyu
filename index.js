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
  
    const id = req.body.result.parameters.echoText;
    const test = Object.values(name.data);
    const mater = test.filter( number => number.rank === Number(id));
    const mma = mater[0].name;
    const money = mater[0].quotes.USD.price;
    const circulating = mater[0].circulating_supply;
    const total = mater[0].total_supply;
    const max = mater[0].max_supply;
    const hour = mater[0].quotes.USD.percent_change_1h;
    const day = mater[0].quotes.USD.percent_change_24h;
    const week = mater[0].quotes.USD.percent_change_7d;
 


    const ans = `${mma}的現在價格是:${money},
    在一小時浮動為:${hour}(%),
    24小時內浮動為:${day}(%),
    在一個禮拜的浮動為:${week}(%),
    現在循環供應為:${circulating},
    總供應為:${total},
    最大供應為:${max},
    每三分鐘更新一次,
    請再次輸入想查詢的貨幣。`;
  
    var speech = 
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? ans
      : "Seems like some problem. Speak again.";
    //console.log(typeof mma);
    /*var speeh =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
    ? */

     
    
    return res.json({
      speech: speech,
      displayText: speech,
      source: "webhook-echo-sample"
    });

});


app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});


 