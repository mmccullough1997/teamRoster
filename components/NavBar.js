/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/team/new">
              <Nav.Link>Add Team</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>All Teams</Nav.Link>
            </Link>
            <Link passHref href="/public/players">
              <Nav.Link>All Players</Nav.Link>
            </Link>
            <Link passHref href="/private/teams">
              <Nav.Link>My Teams</Nav.Link>
            </Link>
            <Link passHref href="/private/players">
              <Nav.Link>My Players</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
