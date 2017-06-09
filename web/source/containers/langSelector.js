
import React, { PropTypes }   from 'react'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { setLang } from '../actions/lang_actions'
import flag_fr from '../img/flags/France.png'
import flag_en from '../img/flags/UnitedKingdom.png'
import translate from '../lang/language.js'

const LangSelector = (props) => {
  let style = {
    width: '20px',
    height : '20px'
  }

  function getImageFlag() {
    let current_flag
    switch (props.lang) {
    case 'fr':
      current_flag=flag_fr
      break
    case 'en':
      current_flag=flag_en
      break
    }
    return <img style={style} src={current_flag}/>
  }




  return (
    <DropdownButton title={getImageFlag()} id="bg-nested-dropdown" pullRight={true}>
      <MenuItem onClick={()=>props.onChange('fr')} eventKey="fr"><img style={style} src={flag_fr}/> {translate(props.lang, "FR")}</MenuItem>
      <MenuItem onClick={()=>props.onChange('en')} eventKey="en"><img style={style} src={flag_en}/> {translate(props.lang, "EN")}</MenuItem>
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
