import { SET_LANG } from '../actions/lang_actions.js'
const lang = (state = {}, action) => {
  switch (action.type) {
  case SET_LANG:
    return {
      lang: action.lang
    }

  default:
    return state
  }
}

export default lang
