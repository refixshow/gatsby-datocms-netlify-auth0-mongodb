import React from "react"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"

import Layout from "../components/layout"
import { useIdentityContext } from "react-netlify-identity-widget"

const stripePromise = loadStripe(
  "pk_test_51H4VmCK3hG2pI0lfXholFUbbqaJHBdqJ8WEaxYBeTVzpflcti4PxCNM0LOQlrRH880UEzweUPpRoFQnF0DhAFdqN00DBwPUvVT"
)

export default function Home() {
  const identity = useIdentityContext()
  const handleBuy = async () => {
    const getSessionId = await axios.post(
      "https://keen-meitner-56c2e9.netlify.app/.netlify/functions/stripe"
    )

    const stripe = await stripePromise

    const { error } = await stripe.redirectToCheckout({
      sessionId: getSessionId.data.sessionId,
      locale: "pl",
      customerEmail: "adamscieszka@gmail.com",
    })

    if (!error) {
      const res = axios.post(
        "https://keen-meitner-56c2e9.netlify.app/.netlify/functions/stripe",
        { email: "adamscieszka@gmail.com", text: "test" }
      )

      console.log(res)
    }
  }

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
    <Layout>
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
      ></iframe> */}
      <pre>{JSON.stringify(identity, null, 2)}</pre>{" "}
      <button onClick={handleBuy}>XD</button>
    </Layout>
  )
}
