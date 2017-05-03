import React, { PropTypes } from 'react'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'
import CenterPanel from '../components/CenterPanel'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export let App = (props) => {


  if( !props.user ||
    !props.user._id ||
    !props.user.connected
  ){
    props.bHistory.push('/login')
  }

  return (
    <CenterPanel >
      <AddExpense />
      <MonthlyExpenseList />
    </CenterPanel>
  )
}


const mapStateToProps = (state) => {
  const props = {}
  props.user = state.user || {_id: '',email: '', password: '', connected: false, error: false}
  props.bHistory = browserHistory
  return props
}

App.propTypes = {
  bHistory: PropTypes.any,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    connected : PropTypes.bool.isRequired,
    error :  PropTypes.bool.isRequired
  })
}

export default connect(mapStateToProps)(App)
