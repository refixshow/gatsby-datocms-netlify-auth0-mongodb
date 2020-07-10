import React, { useEffect } from "react"
import Axios from "axios"

export default function Home() {
  useEffect(() => {
    Axios.post(
      "https://keen-meitner-56c2e9.netlify.app/.netlify/functions/sendEmail",
      {
        message: "xddd",
        name: "name",
        email: "adamscieszka@gmail.com",
      }
    )
  }, [])

  return <div>Hello world!</div>
}
