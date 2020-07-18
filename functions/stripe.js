const stripe = require("stripe")(
  "sk_test_51H4VmCK3hG2pI0lfwRGQwmgjB8xcXXOrn7yNxQpgmTOot6uRNczUu5imfaNV1nSPxy3GhT6SGPpejnN0WoLaCxdl00Ezz8JIhE"
)

exports.handler = async function (event, context, callback) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1H4VpBK3hG2pI0lf0gD9G7qq",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://keen-meitner-56c2e9.netlify.app/success",
    cancel_url: "https://keen-meitner-56c2e9.netlify.app/cancel",
  })

  callback(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  })
}
