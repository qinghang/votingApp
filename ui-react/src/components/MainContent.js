import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import PollPage from '../containers/PollPage';
import MyPolls from '../containers/MyPolls';
import NewPoll from '../containers/NewPoll';
import AuthUser from '../containers/AuthUser';

const MainContent = ({status, login}) => {
    return (
      <div>
        <Switch>
          <Route exact path='/polls' component={HomePage} />
          <Redirect exact from='/' to='/polls'/>
          <Route path='/polls/:pollId' component={PollPage} />
          <Route exact path='/newpoll' component={NewPoll} />
          <Route exact path='/mypolls' component={MyPolls} />
          <Route exact path='/authuser' render={props => (
            <AuthUser {...props} status={status} login={login}/>
          )} />
        </Switch>
      </div>
    );
};

export default MainContent;