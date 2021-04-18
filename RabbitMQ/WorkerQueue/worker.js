var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';

        channel.assertQueue(queue, {
            /**
             * This option is important for message durability.
             * When RabbitMQ quits or crashes it will forget the queues and messages unless you tell it not to.
             * This durable option change needs to be applied to both the producer and consumer code.
             *  */
            durable: true
        });
        /**
         * Prefetch is imp for fair dispatching of messages
         * This tells RabbitMQ not to give more than one message to a worker at a time.
         * or in other words ,don't dispatch a new message to a worker until 
         * it has processed and acknowledged the previous one.
         * Instead, it will dispatch it to the next worker that is not still busy.
         */
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s %s", msg.content.toString(), new Date);
            setTimeout(function () {
                console.log(" [x] Done");
                /**
                 * We don't want RabbitMQ to loose the task if the worker dies 
                 * and for this reason we need proper message acknowledgments.
                 * If a consumer dies (its channel is closed, connection is closed, or TCP connection is lost) 
                 * without sending an ack, RabbitMQ will understand that a message wasn't processed fully and 
                 * will re-queue it. If there are other consumers online at the same time, 
                 * it will then quickly redeliver it to another consumer. 
                 * That way you can be sure that no message is lost, even if the workers occasionally die.
                 */
                channel.ack(msg);
            }, 3000);
        }, {
            // manual acknowledgment mode,
            // see https://www.rabbitmq.com/confirms.html for details
            noAck: false
        });
    });
});