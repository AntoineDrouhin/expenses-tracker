import { connect } from 'react-redux'
import { postExpense } from '../actions/expense_asyncActions'
import ExpenseForm from '../components/ExpenseForm'

const getExpensesTypes = (expensesTypes) => {
  return expensesTypes
}

const mapStateToProps = (state) => {
  return {
    expensesTypes: getExpensesTypes(state.expensesTypes),
    lang : state.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (amount, expenseType, date) => {
      dispatch(postExpense(amount, expenseType, date))
    }
  }
}

const AddExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm)


export default AddExpense
