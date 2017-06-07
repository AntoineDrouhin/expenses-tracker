var trads = {
  'FR' : {
    'fr' : 'Français',
    'en' : 'French'
  },
  'EN' : {
    'fr' : 'Anglais',
    'en' : 'English'
  },
  'LOGIN_BTN' : {
    'fr' : 'Se connecter',
    'en' : 'Connect'
  },
  'LANG_SELECTOR' : {
    'fr' : 'Choisir la langue',
    'en' : 'Choose the lang'
  }
}

const translate = (lang, id) => {
  if (trads[id] && trads[id][lang]) {
    return trads[id][lang]
  }
  return 'TRADUCTION ERROR'

}

export default translate
