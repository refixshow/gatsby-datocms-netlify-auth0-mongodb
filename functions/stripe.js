const stripe = require("stripe")(
  "sk_test_51H4VmCK3hG2pI0lfwRGQwmgjB8xcXXOrn7yNxQpgmTOot6uRNczUu5imfaNV1nSPxy3GhT6SGPpejnN0WoLaCxdl00Ezz8JIhE"
)

exports.handler = async function (event, context, callback) {
  const url = window.location.href

  const session = stripe.checkout.sessions.create(
    {
      success_url: `url/success`,
      cancel_url: `url/cancel`,
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_H5ggYwtDq4fbrJ",
          quantity: 1,
        },
      ],
      mode: "payment",
    },
    function (err, ses) {
      console.log(err, ses)
    }
  )

  callback(null, {
    statusCode: 200,
    body: { sessionId: session.id },
  })
}
