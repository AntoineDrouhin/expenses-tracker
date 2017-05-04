import { connect } from 'react-redux'
import { postExpense } from '../actions/expense_asyncActions'
import ExpenseForm from '../components/ExpenseForm'
import { postExpenseType } from '../actions/expenseType_asyncActions'

const mapStateToProps = (state) => {
  return {
    expensesTypes: state.expensesTypes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (amount, expenseType, date) => {
      dispatch(postExpense(amount, expenseType, date))
    },
    onValidateType : (label) =>{
      dispatch(postExpenseType(label))
    }
  }
}

const AddExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm)


export default AddExpense
