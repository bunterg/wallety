const React = require('react')
const ReactDOM = require('react-dom')
const { remote } = require('electron')
const { exit, login, openApp } = remote.require('./index.js')

const Option = ({
  cancel,
  openApp,
  login
}) => (
  React.createElement("div", null, 
    React.createElement("button", {onClick: login}, "Tengo cuenta"), 
    React.createElement("button", {onClick: openApp}, "Continuar"), 
    React.createElement("button", {onClick: cancel}, "Cancel")
  )
)

const Wallety = ({
  cancel,
  openApp,
  login
}) => (
  React.createElement("div", null, 
    React.createElement("h1", null, "Wallety"), 
    React.createElement("span", null, "Si no posee una cuenta de click continuar, posteriormente podrá validar sus datos"), 
    React.createElement(Option, {cancel: cancel, openApp: openApp, login: login})
  )
)

ReactDOM.render(React.createElement(Wallety, {cancel: () => {exit()}, openApp: () => {openApp()}, 
login: () => {login()}}), document.getElementById('app'));