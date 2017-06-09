
const initialState = {
  expenses : {
    expenseList : [],
    isInit : false
  },
  expenseTypes: {
    items : [],
    isInit : false
  },
  user : {_id: '',email: '', password: '', connected: false, error: false},
  displayOption : {
    displayModal : false,
    createUser : {
      error : false,
      errorMsg : '',
      creationSuccess : false
    }
  },
  lang : 'fr'
}

export default initialState
