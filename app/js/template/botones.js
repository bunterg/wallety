const React = require('react')

const CustomButton = ({metodo, val}) => (
    React.createElement("button", {onClick: metodo}, val)
)

module.exports = { CustomButton }
