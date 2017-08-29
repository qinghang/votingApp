import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/polls'>Voting App</Link>
      </Navbar.Brand>
    </Navbar.Header>
    {!props.status.login &&
      <Nav pullRight>
        <NavItem href="https://fccb-votingapp.herokuapp.com:3001/auth/twitter">Login with Twitter</NavItem>
      </Nav>
    }
    {props.status.login &&
      <Nav pullRight>
        <LinkContainer to='/mypolls'>
          <NavItem>My Polls</NavItem>
        </LinkContainer>
        <LinkContainer to='/newpoll'>
          <NavItem>New Poll</NavItem>
        </LinkContainer>
        <NavDropdown title={props.status.user} id="signout-btn">
          <LinkContainer to='/polls'>
            <MenuItem eventKey="1" onClick={props.signout}>Signout</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    }
  </Navbar>
);

export default Header;