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
  },
  'EMAIL_ADDRES': {
    'fr' : 'Adresse mail',
    'en' : 'Email address'
  },
  'EMAIL_ADDRES_DISP': {
    'fr' : 'mon_adresse@domaine.com',
    'en' : 'my_adress@domain.com'
  },
  'PASSWORD': {
    'fr' : 'Mot de passe',
    'en' : 'Password'
  },
  'SIGN_UP': {
    'fr' : 'S\'inscrire',
    'en' : 'Sign up'
  },
  'SORRY' : {
    'fr' : 'Oups désolé!',
    'en' : 'Oh sorry!'
  },
  'CHECK_INFO_CONNECTION' : {
    'fr' : 'Veuillez vérifier vos informations de connexions s\'il vous plait',
    'en' : 'Plese check your connection information'
  }
}

const translate = (lang, id) => {
  if (trads[id] && trads[id][lang]) {
    return trads[id][lang]
  }
  return 'TRADUCTION ERROR'

}

export default translate
