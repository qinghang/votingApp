import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ShowPolls from '../components/ShowPolls';

class MyPolls extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mypolls: []
    }
  }
  componentDidMount(){
    return fetch('/api/getmypolls')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        mypolls: responseJson
      });
    });
  }
  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h2>My Polls</h2>
        <p>Below are the polls you created</p>
        <ShowPolls polls={this.state.mypolls}/>
      </Jumbotron>
    );
  }
}

export default MyPolls;