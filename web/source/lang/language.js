var trads = {
  'LOGIN_BTN' : {
    'fr' : 'Se connecter',
    'en' : 'Connect'
  }
}

const translate = (lang, id) => {
  if (trads[id] && trads[id][lang]) {
    return trads[id][lang]
  }
  return 'TRADUCTION ERROR'

}

export default translate
