import React from 'react';
import Header from './Header';
import MainContent from '../components/MainContent';

class App extends React.Component {
    constructor(props){
        super(props);
        const user = sessionStorage.getItem('user') || 'unknown';
        const login = user === 'unknown'? false : true;
        this.state = {
            login: login,
            user: user
        }

        this.login = this.login.bind(this);
        this.signout = this.signout.bind(this);
    }

    login(user){
        this.setState({
            login: true,
            user: user
        });
        sessionStorage.setItem('user', user);
    }

    signout(){
        this.setState({
            login: false,
            user: 'unknown'
        });
        sessionStorage.removeItem('user');
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