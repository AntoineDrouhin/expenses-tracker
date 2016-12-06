import { connect } from 'react-redux'
import { addExpense } from '../actions'
import ExpenseForm from '../components/ExpenseForm'

const getExpensesTypes = (expensesTypes) => {
  return expensesTypes
}

const mapStateToProps = (state) => {
  return {
    expensesTypes: getExpensesTypes(state.expensesTypes)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (amount, expenseType) => {
      console.log(amount)
      dispatch(addExpense(amount, expenseType))
    }
  }
}

const AddExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm)


export default AddExpense
