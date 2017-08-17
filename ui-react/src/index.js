import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Navbar, Nav, NavItem, Jumbotron, ButtonGroup, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import {LinkContainer} from 'react-router-bootstrap';
import Helper from './utils/helper';

function Header(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/polls'>Voting App</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem>Login</NavItem>
        <LinkContainer to='/mypolls'>
          <NavItem>My Polls</NavItem>
        </LinkContainer>
        <LinkContainer to='/newpoll'>
          <NavItem>New Poll</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

function MainContent(props) {
  return (
    <div>
      <Switch>
        <Route exact path='/polls' component={HomePage} />
        <Redirect exact from='/' to='/polls'/>
        <Route path='/polls/:pollId' component={PollPage} />
        <Route exact path='/newpoll' component={NewPoll} />
        <Route exact path='/mypolls' component={MyPolls} />
      </Switch>
    </div>
  );
}

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
    alert('You have voted for: ' + voteOpt);
    var pollId = this.props.match.params.pollId;
    var voteIndex = this.state.poll.vote.findIndex(p => p.opt === voteOpt);
    var num = voteIndex >= 0? this.state.poll.vote[voteIndex].num + 1 : 1;
  
    var pollData = {
      pollId: pollId,
      voteIndex: voteIndex,
      num: num,
      voteOpt: voteOpt
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
      window.location.reload();
    });
    e.preventDefault();
  }

  render() {
    const stat = this.state.poll.vote;
    const listOpts = stat.map((item, index) =>
      <option value={item.opt} key={index}>{item.opt}</option>
    );
    const chart_data = { labels: Helper.getOpt(stat, 'opt'),
                         datasets: [{label: 'Number of Votes', data: Helper.getNum(stat, this.state.optVal)}]};
    const chart_opt = {scales: {yAxes:[{ticks:{beginAtZero: true}}]}};

    return (
      <Jumbotron style={{ textAlign: 'center'}}>
        <h3>{this.state.poll.pollName}</h3>
        <Bar data={chart_data} options={chart_opt}/>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>I'd like to vote for ...</ControlLabel>
            <FormControl componentClass="select" placeholder="select" style={{width: '30%',margin:'0 auto'}} value={this.state.optVal} onChange={this.handleChange}>
              <option value="select">select</option>
              {listOpts}
              <option value="custom">I'd like a custom option</option>
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
        <Button bsStyle="danger" onClick={this.handleRemove}>Remove this Poll</Button>
      </Jumbotron>
    );
  }
}

function ShowPolls(props) {
  const polls = props.polls;
  const listPolls = polls.map((poll) =>
    <LinkContainer to={`/polls/${poll.pollId}`} key={poll.pollId.toString()}>
      <Button>
        {poll.pollName}
      </Button>
    </LinkContainer>
  );
  return (
    <ButtonGroup vertical block style={{ width: '90%' }}>
      {listPolls}
    </ButtonGroup>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainContent />
      </div>
    );
  }
}

// ========================

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
, document.getElementById('root'));
