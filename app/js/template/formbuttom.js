const React = require('react')

class Accept extends React.Component {
    render() {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "submit", value: "Submit"})
            )
        );
    }
}


class AcceptReset extends React.Component {
    render() {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "submit", value: "Submit"}), 
                React.createElement("input", {type: "reset"})
            )
        );
    }
}

class AcceptResetReverse extends React.Component {
    render() {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "reset"}), 
                React.createElement("input", {type: "submit", value: "Submit"})
            )
        );
    }
}

module.exports = { Accept, AcceptReset, AcceptResetReverse }
