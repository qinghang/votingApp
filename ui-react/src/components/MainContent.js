import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import PollPage from '../containers/PollPage';
import MyPolls from '../containers/MyPolls';
import NewPoll from '../containers/NewPoll';

const MainContent = () => (
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

export default MainContent;