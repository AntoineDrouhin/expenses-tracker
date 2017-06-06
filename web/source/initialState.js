

const initialState = {
  expenses : {
    expenseList : [],
    isInit : false
  },
  expensesTypes: [{
    id: 0,
    label: 'Food'
  }, {
    id: 1,
    label: 'Tools'
  }, {
    id: 2,
    label: 'Clothes'
  }],
  user : {_id: '',email: '', password: '', connected: false, error: false}
}

export default initialState
