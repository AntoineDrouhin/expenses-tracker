
import React, { PropTypes } from 'react'
import { Navbar, Button, Nav } from 'react-bootstrap'
import BG from '../img/logo.png'
import LangSelector from '../containers/langSelector'

const TopBar = (props) => {

  return (
    <Navbar>
    <Navbar.Header>
      <div style={{marginTop:'4px', fontSize:'18px'}}>
        <a href="#" style={{color: 'white'}}><img style={{height:'40px',width:'40px'}} src={BG}/>  Expense Tracker</a>
        </div>
    </Navbar.Header>
      <Nav pullRight>
        <div style={{marginTop:'8px'}}>
        <Button onClick={props.onDisconnect} bsStyle='danger'>Disconnect</Button>
        <LangSelector></LangSelector>
        </div>
      </Nav>
    </Navbar>
  )
}

TopBar.propTypes = {
  onDisconnect : PropTypes.func.isRequired
}

export default TopBar
