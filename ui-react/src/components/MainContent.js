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
          <PrivateRoute path="/newpoll" component={NewPoll} status={status}/>
          <PrivateRoute path="/mypolls" component={MyPolls} status={status}/>
          <Route path='/authuser/:id' render={props => (
            <AuthUser {...props} status={status} login={login}/>
          )} />
        </Switch>
      </div>
    );
};

const PrivateRoute = ({ status, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    status.login ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/polls',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


export default MainContent;