const express = require('express')
const app = express()
const port = 3000
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true; //disable annoying worning message
const sqsCient= require('@aws-sdk/client-sqs');
const { Consumer } = require('sqs-consumer');
const config = require("config");
AWS.config.update(config);
const sqs = new AWS.SQS({apiVersion: config.get(`apiVersion`)});
const QueueUrl =config.get(`QueueUrl`);


//Consumer section
const consumer  = Consumer.create({
  queueUrl: QueueUrl,
  region: config.get(`region`),
  handleMessageBatch: async (messages) => {
    console.log(messages);  //It will console log the response here
    // let body = JSON.parse(messages[0].Body);
    // console.log({ body });
  },
  sqs: new sqsCient.SQSClient({
    region: config.get(`region`),
    credentials: {
      accessKeyId: config.get(`accessKeyId`),
      secretAccessKey: config.get(`secretAccessKey`),
    }
  }),
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
  console.error(err.message);
});


app.get('/send-message', async (req, res) => {

  var data = "In this object you can send the data you want";
  sqs.sendMessage(
    {
      MessageBody: JSON.stringify({
        message_type: 'Test1',
        data,
        date: new Date().toISOString(),
      }),
      QueueUrl,
    },
    (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log("Successfully added message", data.MessageId);
      }
    },
  );

})








app.listen(port, () => {
  consumer.start();
  console.log(`Example app listening on port ${port}`)
})



