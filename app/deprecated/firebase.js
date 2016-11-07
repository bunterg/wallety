firebase.initializeApp(fireconf.config)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous
    var uid = user.uid
    createWindow()
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
})
let database = firebase.database()
let user = firebase.auth().currentUser


// cerrar ventana vieja y abrir una nueva
createWindow = () => {
  //database.ref(fireconf.ref.test).push().set({hola:"mundo"})
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})
  
  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/view/index.html`)
  //hide menu
  win.setMenu(null)
  // Open the DevTools.
  win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createWindowLogin () {
  win = new BrowserWindow({width: 400, height: 400})
  win.loadURL(`file://${__dirname}/view/intro.html`)
  win.setMenu(null)
  win.webContents.openDevTools()
}

function login () {
  if (user) {
    console.log(user)
    // User is signed in.
    createWindow()
  } else {
    // No user is signed in.
    createWindowLogin()
  }
}

module.exports = {
  getprueba: (next) => {
    /*database.ref(fireconf.ref.test).on('value', (snapshot) => {
      next(snapshot.val());
    });*/
    database.ref(fireconf.ref.test).once('value').then((snapshot) => {
      next(snapshot.val())
    });
  },
  exit: () => {
    console.log('bye')
    app.quit()
  },
  openApp: () => {
    console.log('creando cuenta')
    firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Code',error)
      console.log(errorMessage)
    })
  },
  login: () => {
    createWindow()
  },
  validate: (cred) => {
    var credential = firebase.auth.EmailPasswordAuthProvider.credential(cred.email, cred.password)
    auth.currentUser.link(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
    }, function(error) {
      console.log("Error upgrading anonymous account", error);
    });
  }
}

const a = {
  name:'Anonymous',
  deuda: {
    hola:'mundo'
  },
  gasto: {
    hola:'mundo'
  },
  pago: {
    hola:'mundo'
  },
  cliente: {
    hola:'mundo'
  }
}
