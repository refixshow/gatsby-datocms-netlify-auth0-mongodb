const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "adamscieszka@gmail.com",
    clientId:
      "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
    clientSecret: "Xhl0t3Q8fFpRh5e2PXWB5FCp",
    refreshToken:
      "1//04g52H3f9HMBXCgYIARAAGAQSNwF-L9IrsBEBYFZ--OEOIO2mW8zCxCjpXqTl6ZMcRh5CEOago_a70cyAT5DXMM-Kq6po-HluLSA",
    accessToken:
      "ya29.a0AfH6SMAuhNczT-Rs_mWP82EiAU-n0dev4Myb1G6_BlJzwrGknVh3UjcBjexyjbMIA5Onbj9zFQXWpv5RC5S4-bugpxjGGyzNxwEON6hNo2ttP-mOWIEGTcEMinxvLEc4g2yEpYGaPxVXr1fWyxPrhfCS5Wov_MXLWwE",
  },
})

const mailOptions = {
  from: "adamscieszka@gmail.com",
  to: "adamscieszka@gmail.com",
  subject: "subject",
  text: "text",
}

exports.handler = (event, context, callback) => {
  const { email, text } = JSON.parse(event.body)

  if (event.httpMethod === "POST" && email && text) {
    mailOptions.from = email
    mailOptions.text = text

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, {
          statusCode: 200,
          body: "OK",
        })
      }
    })

    mailOptions.from = "adamscieszka@gmail.com"
    mailOptions.text = "text"
  } else {
    callback(null, {
      statusCode: 404,
      body: "not found",
    })
  }
}
