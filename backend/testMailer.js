/** @format */
require("dotenv").config();

const { sendEmail } = require("./src/utils/mailer");

(async () => {
  try {
    const info = await sendEmail({
      to: "gallantdev39@gmail.com",
      subject: "Plaque App Email Test",
      html: "<h2>✅ Your mailer works perfectly!</h2><p>This is a test from your Plaque backend.</p>",
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
})();
