var kafka = require("kafka-node");

/*
  Same thing as connection.js in Backend. Since Kafka Backend act as both consumer and producer,
  we have both these functions here as well.
*/
function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    // this.client = new kafka.KafkaClient({kafkaHost: '3.92.197.7:9092,3.82.197.115:9092,3.81.189.146:9092'});
    //this.client = new kafka.KafkaClient({kafkaHost: 'localhost:9092,localhost:9093'});
    this.client = new kafka.KafkaClient("localhost:2181");
    //this.client = new kafka.Client("10.0.0.40:2181");
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    this.client.on("ready", function() {
      console.log("client ready! for topic: " + topic_name);
    });

    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function() {
    if (!this.kafkaProducerConnection) {
      // const client = new kafka.KafkaClient({kafkaHost: 'kafka_server_ip:9092'});
      //this.client = new kafka.KafkaClient({kafkaHost: 'localhost:9092,localhost:9093'});
      this.client = new kafka.KafkaClient("localhost:2181");
      //this.client = new kafka.Client("10.0.0.40:2181");
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
