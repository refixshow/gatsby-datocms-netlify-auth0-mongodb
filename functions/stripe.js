const stripe = require("stripe")(
  "sk_test_51H4VmCK3hG2pI0lfwRGQwmgjB8xcXXOrn7yNxQpgmTOot6uRNczUu5imfaNV1nSPxy3GhT6SGPpejnN0WoLaCxdl00Ezz8JIhE"
)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

exports.handler = async function (event, context, callback) {
  const claims = context.clientContext && context.clientContext.user

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "pln",
    payment_method_types: ["card"],
  })

  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify({ client_secret: paymentIntent.client_secret }),
  })
}
