
import KafkaConfig from "./config/kafka-config";
import { createTransport } from "nodemailer";



const kafkaInstance = new KafkaConfig()
let order; 

const transporter = createTransport({
    host: 'host.docker.internal',
    port: 1025
});

async function sendOrderDetails() {
    await transporter.sendMail({
        from: 'from@example.com',
        to: 'admin@admin.com',
        subject: 'An order has been completed',
        html: `Order #${order.id} with a total of $${order.total} has been completed`
    });

}

async function sendEarnedRevenue() {
    await transporter.sendMail({
        from: 'from@example.com',
        to: order.ambassador_email,
        subject: 'An order has been completed',
        html: `You earned $${order.ambassador_revenue} from the link #${order.code}`
    });
}

kafkaInstance.consume("default",async (value) => {
    console.log("📨 Receive message: ", value);
    order = value;
    sendOrderDetails();
    sendEarnedRevenue();
    await transporter.close();
})


