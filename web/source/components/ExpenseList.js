import React, { PropTypes } from 'react'
import ExpenseItem from './ExpenseItem'
import { Table, Col, Navbar, FormGroup, FormControl } from 'react-bootstrap'
import CenterPanel from './CenterPanel'
import TotalExpense from './TotalExpense'
import translate from '../lang/language.js'
import ReactDOM from 'react-dom'

class ExpenseList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      totalAmount : props.expenses.expenseList.reduce((a, b) => a + b.amount, 0),
      filteredExpenseList : props.expenses.expenseList
    }
  }

  filterList (filter) {
    let filteredExpenseList = this.props.expenses.expenseList
      .filter(expense => expense.expenseType.indexOf(filter) >= 0)
    let totalAmount =  filteredExpenseList.reduce((a, b) => a + b.amount, 0)
    this.setState({
      filteredExpenseList,
      totalAmount
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      nextState.totalAmount = nextProps.expenses.expenseList.reduce((a, b) => a + b.amount, 0)
      nextState.filteredExpenseList = nextProps.expenses.expenseList
    }

  }


  componentDidMount() {
    if( ! this.props.expenses.isInit){
      this.props.syncExpenses()
    }
  }

  render () {
    return(
    <CenterPanel >
    <h4 className="main-section"> {translate(this.props.lang, 'MY_EXPENSE')}</h4>
    <Navbar style={{'background' : '#E8E8E8'}}>
      <Navbar.Collapse>
      <Navbar.Header>
      </Navbar.Header>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" placeholder={translate(this.props.lang, 'EXPENSE_TYPE')}
            onChange={ ref => {
              if (ref) return this.filterList(ReactDOM.findDOMNode(ref.target).value)}
            }
          />
        </FormGroup>
        {' '}
      </Navbar.Form>
      </Navbar.Collapse>

    </Navbar>
      <Col mdOffset={1} md={10}>
        <Table style={{marginLeft: 'auto', marginRight: 'auto'}} responsive >
        <thead>
         <tr>
           <th>{translate(this.props.lang, 'EXPENSE_TYPE')}</th>
           <th>{translate(this.props.lang, 'DATE')}</th>
           <th>{translate(this.props.lang, 'AMOUNT')}</th>
           <th>{translate(this.props.lang, 'DELETE')}</th>
         </tr>
       </thead>
          <tbody >
            {this.state.filteredExpenseList.map(exp =>
                <ExpenseItem
                  key={exp._id}
                  {...exp}
                  onDeleteClick={() => this.props.onDeleteClick(exp._id)} />
            )}
          </tbody >
        </Table >
      </Col>

      <TotalExpense totalAmount={this.state.totalAmount} lang={this.props.lang} />

    </CenterPanel>
    )
  }
}

ExpenseList.propTypes = {
  expenses : PropTypes.shape({
    expenseList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      expenseType: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }).isRequired).isRequired,
    isInit : PropTypes.bool.isRequired
  }),
  onDeleteClick: PropTypes.func.isRequired,
  syncExpenses: PropTypes.func.isRequired,
  lang : PropTypes.string.isRequired
}

export default ExpenseList
