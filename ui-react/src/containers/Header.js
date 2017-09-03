import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    sessionStorage.setItem('location', window.location.pathname);
    window.location.href = "http://localhost:3001/auth/twitter";
  }

  render(){
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/polls'>Voting App</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {!this.props.status.login &&
          <Nav pullRight>
            <NavItem onClick={this.handleClick}>Login with Twitter</NavItem>
          </Nav>
        }
        {this.props.status.login &&
          <Nav pullRight>
            <LinkContainer to='/mypolls'>
              <NavItem>My Polls</NavItem>
            </LinkContainer>
            <LinkContainer to='/newpoll'>
              <NavItem>New Poll</NavItem>
            </LinkContainer>
            <NavDropdown title={this.props.status.user} id="signout-btn">
              <LinkContainer to='/polls'>
                <MenuItem eventKey="1" onClick={this.props.signout}>Signout</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        }
      </Navbar>
    );
  }

}

export default Header;