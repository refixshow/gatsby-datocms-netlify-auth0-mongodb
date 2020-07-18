import React from "react"
import { IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

export const wrapRootElement = ({ element }) => (
  <IdentityContextProvider url="https://hungry-yonath-ed6433.netlify.com/">
    {element}
  </IdentityContextProvider>
)
