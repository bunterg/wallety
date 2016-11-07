const React = require('react')
const ReactDOM = require('react-dom')

class HelloMessage extends React.Component {
  render() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
}
const mountNode = document.getElementById('example');

ReactDOM.render(React.createElement(HelloMessage, {name: "John"}), mountNode);