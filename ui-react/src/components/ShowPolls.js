import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

export default ShowPolls;