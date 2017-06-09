import React, { PropTypes } from 'react'
import AddExpense from './AddExpense'
import MonthlyExpenseList from './MonthlyExpenseList'
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
    <div>
      <TopBar onDisconnect={props.onDisconnect} lang={props.lang}/>
      <AddExpense />
      <MonthlyExpenseList />
    </div>
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
  props.lang = state.lang
  return props
}

App.propTypes = {
  bHistory: PropTypes.any,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    connected : PropTypes.bool.isRequired,
    error :  PropTypes.bool.isRequired
  }),
  onDisconnect: PropTypes.func.isRequired,
  lang : PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
