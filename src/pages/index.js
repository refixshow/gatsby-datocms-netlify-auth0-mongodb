import React from "react"
// import axios from "axios"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/CheckoutForm"

import Layout from "../components/layout"
// import { useIdentityContext } from "react-netlify-identity-widget"

const stripePromise = loadStripe(
  "pk_test_51H4VmCK3hG2pI0lfXholFUbbqaJHBdqJ8WEaxYBeTVzpflcti4PxCNM0LOQlrRH880UEzweUPpRoFQnF0DhAFdqN00DBwPUvVT"
)

export default function Home() {
  // const identity = useIdentityContext()

  // const handlePutCalendar = async () => {
  //   const res = await axios.put(
  //     "/.netlify/functions/googleCalendarDEV",
  //     null,
  //     identity.user && {
  //       headers: {
  //         Authorization: `Bearer ${identity.user.token.access_token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  // }

  return (
    <Layout>
      <Helmet>
        <meta
          name="google-site-verification"
          content="yQNSXq4skUl0QB3Iwxgov8_dbm9qQOjACLaw2WCJuv4"
        />
        <title>powinno dzialac</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Link to="/scheduler">XDDDDD</Link>
    </Layout>
  )
}
