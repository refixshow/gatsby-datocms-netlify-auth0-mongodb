import React, { useState } from "react"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51H4VmCK3hG2pI0lfXholFUbbqaJHBdqJ8WEaxYBeTVzpflcti4PxCNM0LOQlrRH880UEzweUPpRoFQnF0DhAFdqN00DBwPUvVT"
)
// import {
//   IdentityModal,
//   useIdentityContext,
// } from "react-netlify-identity-widget"
// import "react-netlify-identity-widget/styles.css"
// import "@reach/tabs/styles.css"
// import axios from "axios"

export default function Home() {
  const handleBuy = async () => {
    const res = await axios.post(
      "https://keen-meitner-56c2e9.netlify.app/.netlify/functions/stripe"
    )

    const stripe = await stripePromise

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.data.sessionId,
    })
  }

  // const identity = useIdentityContext()
  // const [dialog, setDialog] = useState(false)
  // const name =
  //   (identity &&
  //     identity.user &&
  //     identity.user.user_metadata &&
  //     identity.user.user_metadata.full_name) ||
  //   "NoName"

  // const handlePostClick = () => {
  //   axios
  //     .post("/.netlify/functions/sendEmail", {
  //       email: "adamscieszka@gmail.com",
  //       text: "custom message",
  //     })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  // const handleGetClick = () => {
  //   axios
  //     .get("/.netlify/functions/sendEmail")
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
    <div>
      {/* Hello world!
      <button onClick={handlePostClick}>Post</button>
      <button onClick={handleGetClick}>Get</button>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=adamscieszka%40gmail.com&ctz=Europe%2FWarsaw"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
        title="google calendar"
      ></iframe>
      <button onClick={() => setDialog(!dialog)}>click</button>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => console.log("hello ", user?.user_metadata)}
        onSignup={user => console.log("welcome ", user?.user_metadata)}
        onLogout={() => console.log("bye ", name)}
      />
      XD */}

      <button onClick={handleBuy}>XD</button>
    </div>
  )
}
