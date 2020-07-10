// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "adamscieszka@gmail.com",
//     pass: "haslo888",
//   },
// })

// const mailOptions = {
//   from: "adamscieszka@gmail.com",
//   to: "adamscieszka@gmail.com",
//   subject: "test",
//   text: "text",
// }

exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "hi",
  })
  // if (event.httpMethod === "POST") {
  // const { email, name, message } = JSON.parse(event.body)
  // mailOptions.subject = `message from ${name}`
  // mailOptions.from = email
  // mailOptions.text = message
  // transporter.sendMail(mailOptions, (err, data) => {
  //   if (err) {
  //     callback(null, {
  //       statusCode: 404,
  //       body: err.message,
  //     })
  //   } else {
  //     callback(null, {
  //       statusCode: 200,
  //       body: "message sent",
  //     })
  //   }
  // })
  //}

  // if (event.httpMethod === "GET") {
  //   callback(null, {
  //     statusCode: 200,
  //     body: "body is here",
  //   })
  // }
}
