var kafka = require("kafka-node");

function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    //if (!this.kafkaConsumerConnection) {

    // getConsumer is connected to localhost:2181 where zookeeper is running
    // const client = new kafka.KafkaClient({kafkaHost: 'kafka_server_ip:9092'});
    this.client = new kafka.KafkaClient("localhost:2181");
    //this.client = new kafka.Client("10.0.0.40:2181");
    /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    // whenever client is connected without any error, cb that prints client ready is called.
    this.client.on("ready", function() {
      console.log("client ready!");
    });
    //}
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function() {
    if (!this.kafkaProducerConnection) {
      // getProducer is connected to localhost:2181 where zookeeper is running
      // const client = new kafka.KafkaClient({kafkaHost: 'kafka_server_ip:9092'});
      this.client = new kafka.KafkaClient("localhost:2181");
      //this.client = new kafka.Client("10.0.0.40:2181");
      /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
