import React from "react"
import { IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

export const wrapRootElement = ({ element }) => {
  const url = "https://keen-meitner-56c2e9.netlify.app"
  return <IdentityContextProvider url={url}>{element}</IdentityContextProvider>
}
