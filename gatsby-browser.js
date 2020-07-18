import React from "react"
import { IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

export const wrapRootElement = ({ element }) => {
  const url = window.location.href
  return <IdentityContextProvider url={url}>{element}</IdentityContextProvider>
}
