
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ShowPolls from '../components/ShowPolls';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      polls: []
    }
  }
  componentDidMount(){
    return fetch('/api/getall')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        polls: responseJson
      });
    });
  }
  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h2>Voting App</h2>
        <p>Select a poll to see the results and vote, or sign-in to make a new poll.</p>
        <ShowPolls polls={this.state.polls}/>
      </Jumbotron>
    );
  }
}

export default HomePage;