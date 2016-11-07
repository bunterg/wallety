const React = require('react')

class Accept extends React.Component {
    render() {
        return (
            <div>
                <input type="submit" value="Submit"/>
            </div>
        );
    }
}


class AcceptReset extends React.Component {
    render() {
        return (
            <div>
                <input type="submit" value="Submit"/>
                <input type="reset"/>
            </div>
        );
    }
}

class AcceptResetReverse extends React.Component {
    render() {
        return (
            <div>
                <input type="reset"/>
                <input type="submit" value="Submit"/>                
            </div>
        );
    }
}

module.exports = { Accept, AcceptReset, AcceptResetReverse }
