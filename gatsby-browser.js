const { IdentityContextProvider } = require("react-netlify-identity-widget")
const React = require("react")

exports.wrapPageElement = ({ element, props }) => {
  const url = "https://keen-meitner-56c2e9.netlify.app/.netlify/identity"
  return (
    <IdentityContextProvider url={url} {...props}>
      {element}
    </IdentityContextProvider>
  )
}
