import React, { PropTypes } from 'react'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'
import CenterPanel from '../components/CenterPanel'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export let App = (props) => {

  if( props.userInformation == {} ||
    !props.userInformation ||
    props.userInformation.connectionStatus == false
  ){
    // browserHistory is injected through props.
    props.bHistory.push('/login')
  }

  return (
    <CenterPanel >
      <AddExpense />
      <MonthlyExpenseList />
    </CenterPanel>
  )
}

App.propTypes = {
  bHistory: PropTypes.any,
  userInformation: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    connectionStatus : PropTypes.bool.isRequired
  })
}

const mapStateToProps = (state) => {
  const props = {}
  props.userInformation = state.userInformation || {email: '', password: '', connectionStatus: false}
  props.bHistory = browserHistory
  return props
}

export default connect(mapStateToProps)(App)
