import React from 'react';
import { Button, Jumbotron, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Helper from '../utils/helper';

class NewPoll extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    var _self = this;
    var pollId = (new Date().valueOf()).toString();
    var creater = 'qinghang';
    var pollData = {
      pollId: pollId,
      pollName: this.input.value,
      vote: Helper.genVote(this.textarea.value),
      creater: creater
    }
    fetch('/api/savepoll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pollData: pollData
      })
    })
    .then(function(){
      _self.props.history.push('/polls/'+pollId);
    });

    e.preventDefault();
  }

  render(){
    return(
      <Jumbotron style={{textAlign: 'center'}}>
        <h2>Create a new poll</h2>
        <form style={{textAlign: 'left', padding: '10px 100px'}} onSubmit={this.handleSubmit}>
          <FormGroup controlId="pollTitle">
            <ControlLabel>Poll Title</ControlLabel>
            <FormControl 
              componentClass="input" 
              placeholder="Enter title for your poll" 
              inputRef={(ref) => {this.input = ref}}
            />
          </FormGroup>
          <FormGroup controlId="pollOptions">
            <ControlLabel>Poll Options (separate by comma)</ControlLabel>
            <FormControl 
              componentClass="textarea" 
              placeholder="Option1, Option2, Option3, ..."
              inputRef={(ref) => {this.textarea = ref}}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </Jumbotron>
    );
  }
}

export default NewPoll;