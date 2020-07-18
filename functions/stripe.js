const { classroom } = require("googleapis/build/src/apis/classroom")

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

  if (claims) {
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
      customer_email: claims.email,
      locale: "pl",
    })

    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id }),
    })
  } else {
    callback(null, {
      statusCode: 401,
      headers,
      body: "NOT LOGGED",
    })
  }
}
