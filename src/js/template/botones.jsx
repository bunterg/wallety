const React = require('react')

const CustomButton = ({metodo, val}) => (
    <button onClick={metodo}>{val}</button>
)

module.exports = { CustomButton }
