import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => (
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

export default Header;