export const SET_LANG = 'SET_LANG'
export const setLang = (lang) => {
  window.recaptchaOptions = {
    lang :'en'
  }
  console.dir(window)
  return {
    type: SET_LANG,
    lang : lang
  }
}
