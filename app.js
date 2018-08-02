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
  
  app.post("/echo", function(req, res) {
    var speech =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.echoText
        ? req.body.result.parameters.echoText
        : "Seems like some problem. Speak again.";
    return res.json({
      speech: speech,
      displayText: speech,
      source: "webhook-echo-sample"
    });
  });
  


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
    const test = Object.values(name.data);
    const id = req.params.id; 
    console.log('id', Number(id));
    const mater = test.filter( number => number.rank === Number(id));
    console.log('aa', mater);  
       
});

app.post("/slack-test", function(req, res) {
    var slack_message = {
      text: "Details of JIRA board for Browse and Commerce",
      attachments: [
        {
          title: "JIRA Board",
          title_link: "http://www.google.com",
          color: "#36a64f",
  
          fields: [
            {
              title: "Epic Count",
              value: "50",
              short: "false"
            },
            {
              title: "Story Count",
              value: "40",
              short: "false"
            }
          ],
  
          thumb_url:
            "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        },
        {
          title: "Story status count",
          title_link: "http://www.google.com",
          color: "#f49e42",
  
          fields: [
            {
              title: "Not started",
              value: "50",
              short: "false"
            },
            {
              title: "Development",
              value: "40",
              short: "false"
            },
            {
              title: "Development",
              value: "40",
              short: "false"
            },
            {
              title: "Development",
              value: "40",
              short: "false"
            }
          ]
        }
      ]
    };
    return res.json({
      speech: "speech",
      displayText: "speech",
      source: "webhook-echo-sample",
      data: {
        slack: slack_message
      }
    });
  });    
  




  app.listen(3000, function () {
    console.log('Example app is running on port 3000!');}
  );