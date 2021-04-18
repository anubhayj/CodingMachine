var amqp = require('amqplib/callback_api');

var arg = process.argv[2]
console.log(` Running Task ${arg}`)
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            /**
             * This option is important for message durability.
             * When RabbitMQ quits or crashes it will forget the queues and messages unless you tell it not to.
             * This durable option change needs to be applied to both the producer and consumer code.
             *  */
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            /**
             * 
             * Marking messages as persistent doesn't fully guarantee that a message won't be lost. 
             * Although it tells RabbitMQ to save the message to disk,
             * there is still a short time window when RabbitMQ has accepted a message and hasn't saved it yet. 
             * It may be just saved to cache and not really written to the disk. 
             * The persistence guarantees aren't strong, 
             * 
             * For stronger persistence use publisher confirms. (ref : https://www.rabbitmq.com/confirms.html)
             * 
             */
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 100);
});