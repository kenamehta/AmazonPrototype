//const Database=require('./Database');
var connection = new require("./kafka/Connection");
var connection_string = new require("./config");

//account services
const accountService = require("./services/account");

//connect to MongoDB
const Mongoose = require("mongoose");
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  //   ,
  //   reconnectInterval: 500,
  //   poolSize: 50,
  //   bufferMaxEntries: 0
};
Mongoose.connect(connection_string, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });

//handle topic's request
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Kafka server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    // Handling the make request that was called from backend server here in this function.
    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

//topics
handleTopicRequest("account", accountService);
