import React from 'react';
import Header from './Header';
import MainContent from './MainContent';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            login: false,
            user: 'unknown'
        }

        this.login = this.login.bind(this);
        this.signout = this.signout.bind(this);
    }

    login(user){
        this.setState({
            login: true,
            user: user
        });
    }

    signout(){
        this.setState({
            login: false,
            user: 'unknown'
        });
    }

    render(){
        return (
            <div>
                <Header status={this.state} login={this.login} signout={this.signout} />
                <MainContent status={this.state} login={this.login} signout={this.signout} />
            </div>
        )
    }
}

export default App;