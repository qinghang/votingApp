import React from 'react';
var crypto = require('crypto');

class AuthUser extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        var user = decrypt(id);

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
                this.props.history.push('/polls/');
            }else{
                this.props.login(user);
                this.props.history.push('/polls/');
            }
        });
    }

    render(){
        return (
            <div></div>
        );
    }
}

function decrypt(str){
  var decipher = crypto.createDecipher('aes-256-ctr', "FCCBackendProject#6");
  var dec = decipher.update(str,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

export default AuthUser;