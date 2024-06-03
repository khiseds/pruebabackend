const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export function send(props) {
    const {to,subject,text,html,bcc } =props || {};
    const transporter = nodemailer.createTransport({
        host: "mail.skydone.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: 'alberto.aguado@skydone.com',
          pass: "Wvqg39@94",
        },
      });
  // send mail with defined transport object
  const info =  transporter.sendMail({
    from: '"Alberto Aguado" <alberto.aguado@skydone.com>', // sender address
    to: to ?? '',
    bcc:bcc?? [],
    subject: subject ?? '',
    text: text ?? '',
    html: html ?? '',
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  return true;
}