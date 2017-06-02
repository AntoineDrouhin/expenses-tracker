
import React, { PropTypes } from 'react'
import { Navbar, Button } from 'react-bootstrap'

const TopBar = (props) => {

  return (
    <Navbar>
      <Button onClick={props.onDisconnect} bsStyle='danger'>Disconnect</Button>
    </Navbar>
  )
}

TopBar.propTypes = {
  onDisconnect : PropTypes.func.isRequired
}

export default TopBar
