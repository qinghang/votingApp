import React from 'react';
import { Button, Jumbotron, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import Helper from '../utils/helper';

class PollPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      optVal: '',
      poll: {
        pollId: '',
        pollName: '',
        vote: [
          {
            opt: '-',
            num: 0
          }
        ]
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount(){
    return fetch('/api/getpoll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pollId: this.props.match.params.pollId
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson) {
        alert('Poll is not found.');
        this.props.history.push('/polls/');
        return;
      }
      this.setState({poll: responseJson})
    });
  }

  handleRemove(){
    var result = window.confirm('Are you sure to remove this poll?');
    var _self = this;
    var pollId = this.props.match.params.pollId;
    if(result){
        fetch('/api/deletepoll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollId: pollId
        })
      })
      .then(function(){
        alert('Poll removed successfully');
        _self.props.history.push('/polls/');
      });
    }
  }

  handleChange(e){
    this.setState({optVal: e.target.value});
  }

  handleSubmit(e){
    var voteOpt = this.state.optVal === 'custom'? this.input.value : this.state.optVal;
    var pollId = this.props.match.params.pollId;
    var voteIndex = this.state.poll.vote.findIndex(p => p.opt === voteOpt);
    var num = voteIndex >= 0? this.state.poll.vote[voteIndex].num + 1 : 1;
    var visitor = this.state.poll.visitor;
    var isVoted = this.state.poll.voter.indexOf(visitor) >= 0 ? true : false;

    if(!isVoted){
      var pollData = {
        pollId: pollId,
        voteIndex: voteIndex,
        num: num,
        voteOpt: voteOpt,
        voter: visitor
      }
      fetch('/api/updatepoll', {
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
        alert('You have voted for: ' + voteOpt);
        window.location.reload();
      });
    }else{
      alert('You can only vote once.');
      this.setState({optVal: 'select'});
    }

    e.preventDefault();
  }

  render() {
    const stat = this.state.poll.vote;
    const listOpts = stat.map((item, index) =>
      <option value={item.opt} key={index}>{item.opt}</option>
    );
    const chart_data = { labels: Helper.getOpt(stat, 'opt'),
                         datasets: [{label: 'Number of Votes', data: Helper.getNum(stat, this.state.optVal)}]};
    const chart_opt = {
      scales: {
        yAxes:[
          {
            ticks: {
              min: 0,
              stepSize: 1
            }
          }
        ]
      },
      maintainAspectRatio:false
    }

    const twitter_url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href);

    return (
      <Jumbotron style={{ textAlign: 'center'}}>
        <Button href={twitter_url} style={{ marginLeft: '80%'}}>Share on Twitter</Button>
        <h3>{this.state.poll.pollName}</h3>
        <div style={{ width: '60%', margin: '0 auto'}}>
          <Bar data={chart_data} options={chart_opt} />
        </div>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>I'd like to vote for ...</ControlLabel>
            <FormControl componentClass="select" placeholder="select" style={{width: '30%',margin:'0 auto'}} value={this.state.optVal} onChange={this.handleChange}>
              <option value="select">select</option>
              {listOpts}
              {this.props.status.login &&
                <option value="custom">I'd like a custom option</option>
              }
            </FormControl>
          </FormGroup>
          {this.state.optVal === 'custom' &&
            <FormGroup controlId="customOption" style={{width: '30%',margin:'15px auto'}}>
            <ControlLabel>Vote with my own option</ControlLabel>
            <FormControl 
              componentClass="input" 
              placeholder="Enter your option" 
              inputRef={(ref) => {this.input = ref}}
            />
            </FormGroup>
          }
          <Button type="submit">Submit</Button>
        </form>
        <br/>
        {this.props.status.login && this.props.status.user === this.state.poll.creater &&
          <Button bsStyle="danger" onClick={this.handleRemove}>Remove this Poll</Button>
        }
      </Jumbotron>
    );
  }
}

export default PollPage;