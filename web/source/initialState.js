

const initialState = {
  expenses : {
    expenseList : [],
    isInit : false
  },
  expensesTypes: {
    items : [],
    isInit : false
  },
  user : {_id: '',email: '', password: '', connected: false, error: false},
  displayOptions : {
    displayModal : false
  }
}

export default initialState
