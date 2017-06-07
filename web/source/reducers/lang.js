import { SET_LANG } from '../actions/lang_actions.js'
const lang = (state = 'fr', action) => {
  switch (action.type) {
  case SET_LANG:
    return action.lang

  default:
    return state
  }
}

export default lang
