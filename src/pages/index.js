import React from "react"
import axios from "axios"

export default function Home() {
  const handlePostClick = () => {
    axios
      .post("/.netlify/functions/sendEmail", {
        email: "adamscieszka@gmail.com",
        text: "custom message",
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleGetClick = () => {
    axios
      .get("/.netlify/functions/sendEmail")
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      Hello world!
      <button onClick={handlePostClick}>Post</button>
      <button onClick={handleGetClick}>Get</button>
    </div>
  )
}
