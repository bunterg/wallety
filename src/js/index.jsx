const React = require('react')
const ReactDOM = require('react-dom')
const { createStore} = require('redux')
const { TabHead, TabContent } = require('./template/tab')
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

const App = ({
  LogOut,
  state,
  store
}) => (
  <div>
    <button onClick={()=>(LogOut())}>Salir</button>
    <TabHead state={state} store={store}/>
    <TabContent state={state}/>
  </div>
)

const store = createStore(counter)

const renderer = () => {
  ReactDOM.render(
    <App LogOut={LogOut} state={store.getState()}  store={store}/>,
    document.getElementById('example'))
}

store.subscribe(renderer)
renderer()
