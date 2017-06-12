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
  'CONFIRM_PASSWORD': {
    'fr' : 'Confirmer mot de passe',
    'en' : 'Confirm password'
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
  },
  'DISCONNECT' : {
    'fr' : 'Se déconnecter',
    'en' : 'Log out'
  },
  'ADD_EXPENSE': {
    'fr' : 'Ajouter une dépense',
    'en' : 'Add an expense'
  },
  'AMOUNT': {
    'fr' : 'Montant',
    'en' : 'Amount'
  },
  'DATE': {
    'fr' : 'Date',
    'en' : 'Date'
  },
  'TYPE': {
    'fr' : 'Type',
    'en' : 'Type'
  },
  'VALIDATE': {
    'fr' : 'Valider',
    'en' : 'Validate'
  },
  'MY_EXPENSE': {
    'fr' : 'Mes dépenses',
    'en' : 'My expenses'
  },
  'TOTAL_EXPENSE': {
    'fr' : 'Total des dépenses',
    'en' : 'Total expenses'
  },
  'ADD_EXPENSE_TYPE' : {
    'fr' : 'Ajouter un type de dépenses',
    'en' : 'Add an expense type'
  },
  'NEW_EXPENSE_TYPE': {
    'fr' : 'Nouvau type',
    'en' : 'New type'
  },
  'CLOSE': {
    'fr' : 'Fermer',
    'en' : 'Close'
  },
  'CHECK_INFO': {
    'fr' : 'Veuillez vérifier vos informations',
    'en' : 'Please check your information'
  },
  'EXPENSE_TYPE': {
    'fr' : 'Type de dépense',
    'en' : 'Expense Type'
  },
  'DELETE': {
    'fr' : 'Supprimer',
    'en' : 'Delete'
  },

}

const translate = (lang, id) => {
  if (trads[id] && trads[id][lang]) {
    return trads[id][lang]
  }
  return 'TRADUCTION ERROR'

}

export default translate
