const React = require('react')
const ReactDOM = require('react-dom')
const firebase = require('firebase')
const { createStore} = require('redux')
const { CustomButton } = require('./template/botones')
const { remote } = require('electron')
const { fireconf, moveToIndex } = remote.require('./index.js')

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'NO_USER':
      return state = 1
    case 'USER':
      return state = 2
    case 'NEW_USER':
      return state = 3
    default:
      return state
  }
}

const store = createStore(counter)

firebase.initializeApp(fireconf.config)
let User = firebase.auth().currentUser

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    User = user
    if(store.getState() === 3) {
      store.dispatch({ type: 'USER'})
    } else {
      store.dispatch({ type: 'USER'})
      move()
    }    
  } else {
    // User is signed out.
    store.dispatch({ type: 'NO_USER'})
  }
})
const LogIn = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Text field value is: ' + errorCode + errorMessage);
    })
}
const SignUp = () => {
  store.dispatch({ type: 'NEW_USER'})
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  }).then((user) => {
    var uid = user.uid
    firebase.database().ref(fireconf.ref.user + uid).set({data:fireconf.model}).then(() => {
      move()
    })
  })
}

const move = () => {
  firebase.database().ref(fireconf.ref.user + User.uid + fireconf.ref.data).once('value').then((snapshot) => {
    let response = snapshot.val()
    firebase.database().ref(fireconf.ref.conf).once('value').then((res) => {
      response.conf = res.val()
      moveToIndex(response)
    })
  })
  //moveToIndex()
}
const LogOut = () => { 
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }, function(error) {
        // An error happened.
    });
}

const Tittle = () => (
    <div>
        <h1>Wallety</h1>
        <span>Si no posee una cuenta de click continuar, posteriormente podrá validar sus datos</span>
    </div>
)
class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mail: '', pass: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleChange(event) {
    this.setState({mail: event.target.value});
  }
  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="email"
          placeholder="Correo"
          value={this.state.mail}
          onChange={this.handleChange} />
        <br/>
        <input type="password"
          placeholder="Contraseña"
          value={this.state.pass}
          onChange={this.handleChangePass}/>
        <CustomButton metodo={this.props.metodo} val="Ingresar"/>
      </div>
    );
  }
}
const Loading = () => (
    <h3>Cargando</h3>
)

const App = ({state}) => {
    switch (state) {
    case 1:
      return <div>
                <Tittle/>
                <CustomButton metodo={()=>{SignUp()}} val="Ingresar de todos modos"/>
                <Formulario metodo={()=>{LogIn()}}/>
            </div>
    case 2:
      return <div>
                <Tittle/>
                <CustomButton metodo={()=>{LogOut()}} val="logout"/>
            </div>
    default:
      return <div>
                <Tittle/>
                <Loading/>
            </div>
    }
}

const Render = () => {
  ReactDOM.render(
    <App state={store.getState()} />,
    document.getElementById('app'))
}

store.subscribe(Render)
Render()
