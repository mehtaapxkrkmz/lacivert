// worker.js
const amqp = require("amqplib");
const nodemailer = require("nodemailer");
require('dotenv').config();


// Mail transporter (örnek Gmail)
async function startWorker() {
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

(async () => {
  const connection = await amqp.connect("amqps://mulurzrq:hvGvwgEtB4sLH8CvanLtmavzvcCfqc1Q@stingray.rmq.cloudamqp.com/mulurzrq");
  const channel = await connection.createChannel();
  await channel.assertQueue("welcome_email", { durable: true });

  console.log("🎯 Worker kuyruk dinliyor...");

  channel.consume(
    "welcome_email",
    async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log("💌 Mesaj alındı:", content);

        // Mail gönder
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: content.email,
          subject: "🎉 Hoş Geldiniz Lacivert’e! ",
           html: `
            <h2>Merhaba ${content.firstname},</h2>
            <p>
              Lacivert ailesine katıldığınız için çok mutluyuz!
            </p>
            <p>
              Artık binlerce kaliteli ürüne kolayca ulaşabilir, size özel kampanya ve fırsatlardan ilk siz haberdar olabilirsiniz. Hemen keşfetmeye başlayın ve avantajları kaçırmayın!
            </p>
            
            
            <p>
              Eğer herhangi bir sorunuz olursa bize her zaman ulaşabilirsiniz:<br/>
              📧 <a href="mailto:desteklacivert@gmail.com">desteklacivert@gmail.com</a>
            </p>
            <p>
              Keyifli alışverişler dileriz!<br/>
              Sevgiler,<br/>
              Lacivert Ekibi
            </p>
          `
        });

        console.log("✅ Hoş geldin maili gönderildi:", content.email);

        channel.ack(msg);
      }
    },
    { noAck: false }
  );
})();
}
 module.exports = { startWorker };