import { connect } from 'react-redux'
import { postExpense } from '../actions/expense_asyncActions'
import ExpenseForm from '../components/ExpenseForm'
import { postExpenseType } from '../actions/expenseType_asyncActions'
import { setDisplayModalTrue} from '../actions/displayModal_actions'
import { setDisplayModalFalse} from '../actions/displayModal_actions'
import { fetchExpenseTypes } from '../actions/expenseType_asyncActions.js'

const mapStateToProps = (state) => {
  return {
    expenseTypes: state.expenseTypes,
    displayOption : state.displayOption,
    lang : state.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (amount, expenseType, date) => {
      dispatch(postExpense(amount, expenseType, date))
    },
    onValidateType : (label) =>{
      dispatch(postExpenseType(label))
    },
    onValidateModal  : (value) =>{
      if(value){
        dispatch(setDisplayModalTrue())
      }else{
        dispatch(setDisplayModalFalse())
      }
    },
    syncExpenseTypes : () => {
      dispatch(fetchExpenseTypes())
    }
  }
}

const AddExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm)


export default AddExpense
