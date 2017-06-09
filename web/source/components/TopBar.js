
import React, { PropTypes } from 'react'
import { Navbar, Button, Nav } from 'react-bootstrap'
import BG from '../img/logo.png'
import LangSelector from '../containers/langSelector'
import translate from '../lang/language.js'

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
        <Button onClick={props.onDisconnect} bsStyle='danger' style={{marginRight:'5px'}}>{translate(props.lang, 'DISCONNECT')}</Button>
        <LangSelector></LangSelector>
        </div>
      </Nav>
    </Navbar>
  )
}

TopBar.propTypes = {
  onDisconnect : PropTypes.func.isRequired,
  lang : PropTypes.string
}

export default TopBar
