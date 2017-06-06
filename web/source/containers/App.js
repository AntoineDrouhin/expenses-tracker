import React, { PropTypes } from 'react'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'
import CenterPanel from '../components/CenterPanel'
import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { disconnect } from '../actions/user_asyncActions'

export let App = (props) => {

  if( !props.user ||
    !props.user._id ||
    !props.user.connected
  ){
    props.bHistory.push('/login')
  }

  return (
    <CenterPanel >
      <TopBar onDisconnect={props.onDisconnect}/>
      <AddExpense />
      <MonthlyExpenseList />
    </CenterPanel>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    onDisconnect: () => {
      dispatch(disconnect())
    }
  }
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
  }),
  onDisconnect: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
