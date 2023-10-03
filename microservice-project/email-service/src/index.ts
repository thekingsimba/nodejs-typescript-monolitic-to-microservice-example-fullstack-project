
// import { createTransport } from "nodemailer";

// const transporter = createTransport({
//     host: 'host.docker.internal',
//     port: 1025
// });

// await transporter.sendMail({
//     from: 'from@example.com',
//     to: 'admin@admin.com',
//     subject: 'An order has been completed',
//     html: `Order #${order.id} with a total of $${order.total} has been completed`
// });

// await transporter.sendMail({
//     from: 'from@example.com',
//     to: order.ambassador_email,
//     subject: 'An order has been completed',
//     html: `You earned $${order.ambassador_revenue} from the link #${order.code}`
// });

// await transporter.close();



import { EachMessagePayload, Kafka } from 'kafkajs';

const kafka = new Kafka({
        clientId: 'email-consumer',
        brokers: ['pkc-4ygn6.europe-west3.gcp.confluent.cloud:9092'],
        ssl: true,
        sasl: {
            mechanism: 'plain',
            username: 'KEUX253KKD6SAB3Z',
            password: ""
        }
    }
)

const consumer = kafka.consumer({
    groupId: 'email-consumer'
});

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'default' });
    await consumer.run({
        eachMessage: async (message: EachMessagePayload) => {
            console.log(message)
        }
    }
    )
}


run().then(console.error);