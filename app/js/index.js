const React = require('react')
const ReactDOM = require('react-dom')
const { createStore} = require('redux')
//const main = remote.require('./main.js')
//const {AcceptReset} = require('./template/formbuttom')
const { remote } = require('electron')
const { fireconf, getState } = remote.require('./index.js')
const firebase = require('firebase')
let initialState = getState()
console.log(initialState)
const LogOut = () => { 
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }, function(error) {
        // An error happened.
    });
}
firebase.initializeApp(fireconf.config)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.uid)
  } else {
    // No user is signed in.
    console.log('hola')
  }
})
const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {selected: action.val})
    default:
      return state
  }
}

const TabHead = ({state}) => {
  var row = []
  state.conf.forEach((item, index) => {
    row.push(React.createElement("a", {key: index, className: index === state.selected ? 'menu selected': 'menu', 
    onClick: () => {store.dispatch({ type: 'CHANGE_PAGE', val: index})}}, item.name))
  })
  return React.createElement("div", null, row);
};

const TabContent = ({state}) => {
  const tab = state.conf[state.selected].name
  console.log('tab',tab)
  return React.createElement("span", null, JSON.stringify(state[tab]))
}

const App = ({
  LogOut,
  state
}) => (
  React.createElement("div", null, 
    React.createElement("button", {onClick: ()=>(LogOut())}, "Salir"), 
    React.createElement(TabHead, {state: state}), 
    React.createElement(TabContent, {state: state})
  )
)

const store = createStore(counter)

const renderer = () => {
  ReactDOM.render(
    React.createElement(App, {LogOut: LogOut, state: store.getState()}),
    document.getElementById('example'))
}

store.subscribe(renderer)
renderer()
