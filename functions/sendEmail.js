import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "adamscieszka@gmail.com",
    clientId:
      "1094228178210-bjsgk40ru7p75nd40teu7307rgo8ssvr.apps.googleusercontent.com",
    clientSecret: "Xhl0t3Q8fFpRh5e2PXWB5FCp",
    refreshToken:
      "1//047deFZ6dQ-6qCgYIARAAGAQSNwF-L9IrPmV7sE1mMHvo-pephGYioJXFwXLVkd2oHFKXq5KIn5cbjid8eCetfXyr7AH3HLO_J08",
    accessToken:
      "ya29.a0AfH6SMANZwyu1-4Jo-zmdyNd8Bw3K7wuzmnSTrk6eJG3vCtyLpESL5QcC-Xzv7ziiCwgouGDYtz8SF-sYAv8-0tQwPekFRZj90zgI3j1FgB18Vm5bE9KHHDTw8A6wgFDRh5nOeM2H-rxp1SHIUPJvVTcwzY05-MtQ_s",
  },
})

const mailOptions = {
  from: "adamscieszka@gmail.com",
  to: "adamscieszka@gmail.com",
  subject: "subject",
  text: "text",
}

exports.handler = function (event, context, callback) {
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
  }
}
