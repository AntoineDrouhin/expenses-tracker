
import React  from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import flag_fr from '../img/flags/France.png'
import flag_en from '../img/flags/UnitedKingdom.png'

const LangSelector = (props) => {
  return (
    <DropdownButton title="Dropdown" id="bg-nested-dropdown">
      <MenuItem eventKey="1"><img src={flag_fr}/> Français</MenuItem>
      <MenuItem eventKey="2"><img src={flag_en}/> English</MenuItem>
    </DropdownButton>
  )
}

export default LangSelector
