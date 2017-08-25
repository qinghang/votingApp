import React from 'react';
const queryString = require('query-string');

class AuthUser extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var user = queryString.parse(this.props.location.search).login;
        fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
            if(!responseJson) {
                alert('User is not found.');
                return;
            }
            this.props.login(user);
            this.props.history.push('/polls/');
        });
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default AuthUser;