import { connect } from 'react-redux'
import { removeExpense, fetchExpenses } from '../actions/expense_asyncActions'
import ExpenseList from '../components/ExpenseList'

const getExpenseList = (expenses) => {

  if (expenses === undefined){
    return {expenseList:[], isInit:false}
  }

  let expList =  expenses.expenseList.map((expense) => {
    return Object.assign ( {},
      expense,
      { date : new Date(expense.date).toISOString().substring(0,10) }
    )
  })
  
  return {
    expenseList: expList,
    isInit : expenses.isInit
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: getExpenseList(state.expenses)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (_id) => {
      dispatch(removeExpense(_id))
    },
    syncExpenses : () => {
      dispatch(fetchExpenses())
    }
  }
}

const MonthlyExpenseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList)

export default MonthlyExpenseList
