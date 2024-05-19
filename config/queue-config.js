/* It is one such library that allows us to interact with RabbitMQ from our Node.js application.*/
const amqplib = require("amqplib");
/* mailsender: transport object used to send emails using the Gmail service. */
const mailsender = require("./email-config");
/* Declare these variable in global space : */
let channel, connection;

/* this function is used to establish a connection to a RabbitMQ server and create a communication channel and assert a queue with it */
async function connectQueue(){
    try {
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("mail-queue");
    } catch (error) {
        console.log(error);
    }
}

/* This function is used to publish the message to the queue : */
async function publishMessage(data){
    try {
        await channel.sendToQueue("mail-queue", Buffer.from(JSON.stringify(data)));

    } catch (error) {
        console.log(error);
    }
}

/* This function is used to subscribe the message from the queue :  */
async function subscribeMessage(){
    try {
        channel.consume("mail-queue", async (data) => {
            // console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // console.log("Final object : ", object);
            mailsender.sendMail(object);
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectQueue,
    publishMessage,
    subscribeMessage
}