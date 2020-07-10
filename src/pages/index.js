import React, { useEffect } from "react"
import Axios from "axios"

export default function Home() {
  useEffect(() => {
    Axios.post("/.netlify/functions/sendEmail", {
      message: "xddd",
      name: "name",
      email: "adamscieszka@gmail.com",
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return <div>Hello world!</div>
}
