const Nexmo = require("nexmo")

const nexmo = new Nexmo({
  apiKey: "17fcfc29",
  apiSecret: "srEu5YTphh2Clg2k",
})

const from = "Node try"
const to = "48733211751"
const text = "Hello from Node"

exports.handler = async (event, context, callback) => {
  try {
    //  await nexmo.message.sendSms(from, to, text)

    console.log("google call")
  } catch (err) {
    console.log(err)
  }

  callback(null, {
    statusCode: 200,
    headers,
    body: "XD",
  })
}
