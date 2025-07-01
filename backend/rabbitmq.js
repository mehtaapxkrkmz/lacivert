// rabbitmq.js
const amqp = require("amqplib");

let channel;
let connection;

// RabbitMQ bağlantısını başlat
async function connectRabbitMQ() {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    console.log("✅ RabbitMQ bağlantısı başarılı.");

    // "welcome_email" kuyruğunu oluştur (varsa yeniden kullanır)
    await channel.assertQueue("welcome_email", { durable: true });
  } catch (error) {
    console.error("RabbitMQ bağlantısı hatası:", error);
  }
}

// Kuyruğa mesaj gönder
async function sendToQueue(message) {
  if (!channel) {
    console.error("❌ RabbitMQ kanalı hazır değil.");
    return;
  }
  await channel.sendToQueue("welcome_email", Buffer.from(JSON.stringify(message)), {
    persistent: true
  });
  console.log("✅ Mesaj kuyruğa gönderildi:", message);
}

module.exports = { connectRabbitMQ, sendToQueue };