
import React, { PropTypes }   from 'react'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { setLang } from '../actions/lang_actions'
import translate from '../lang/language.js'
import flag_fr from '../img/flags/France.png'
import flag_en from '../img/flags/UnitedKingdom.png'

const LangSelector = (props) => {
  let style = {
    width: '30px',
    height : '30px'
  }
  return (
    <DropdownButton title={translate(props.lang, 'LANG_SELECTOR')} id="bg-nested-dropdown">
      <MenuItem onClick={()=>props.onChange('fr')} eventKey="fr"><img style={style} src={flag_fr}/> {translate(props.lang, 'FR')}</MenuItem>
      <MenuItem onClick={()=>props.onChange('en')} eventKey="en"><img style={style} src={flag_en}/> {translate(props.lang, 'EN')}</MenuItem>
    </DropdownButton>
  )
}

LangSelector.propTypes = {
  'onChange': PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (lang) => {
      dispatch(setLang(lang))
    }
  }
}

const mapStateToProps = (state) => {
  return { lang : state.lang }
}

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)
