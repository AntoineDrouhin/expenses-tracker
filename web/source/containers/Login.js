import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import {Alert, FormGroup , ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import CenterPanel from '../components/CenterPanel'
import { login } from '../actions/user_asyncActions'
import { browserHistory } from 'react-router'
import translate from '../lang/language.js'
import BG from '../img/expense_blur.png'
import logo from '../img/logo.png'
import LangSelector from '../containers/langSelector'
import redirectAfterLoginSuccess from '../actions/user_actions'

const Login = (props) => {

  if( props.user && props.user.connected ){
    browserHistory.push('/')
  }

  let emailInput = null, passwordInput = null

  var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0]

  let style = {
    background: 'url('+BG+')',
    backgroundSize: 'cover',
    padding: '15%',
    height: w.innerHeight|| documentElement.clientHeight|| body.clientHeight
  }

  return (
    <div style={style}>
    <div style={{position:'absolute', right:'15px', top:'15px' }}><LangSelector></LangSelector></div>
    <div style={{boxShadow: '10px 10px 111px 6px rgba(0,0,0,0.75)', maxWidth:'300px', margin: 'auto'}}>
    <CenterPanel  maxWidth='300px' >
    <div style={{textAlign:'center', borderBottom:'1px solid #ccc', marginBottom:'10px'}}>
      <div style={{marginTop:'4px', fontSize:'18px'}}>
        <img style={{height:'60px',width:'60px'}} src={logo}/>
      </div>
      <h4>Expense Tracker</h4>
      </div>
      <form onSubmit={e => {
        e.preventDefault() // prevent page refresh after submit
        props.onValidate(emailInput.value, passwordInput.value )
      }}>
      <FormGroup>
        <ControlLabel>{translate(props.lang, 'EMAIL_ADDRES')}</ControlLabel>
        <FormControl
          type='email'
          inputRef={ (ref) => emailInput = ref }
          placeholder={translate(props.lang, 'EMAIL_ADDRES_DISP')}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>{translate(props.lang, 'PASSWORD')}</ControlLabel>
        <FormControl
          type='password'
          inputRef={ (ref) => passwordInput = ref }
          placeholder='*********'
        />
      </FormGroup >
      <Row>
        <Col md={6}>
          <Button onClick={() => browserHistory.push('/signUp')}>
            {translate(props.lang, 'SIGN_UP')}
          </Button>
        </Col>

        <Col md={6}>
        <div style={{'textAlign': 'right' }}>
          <Button type="submit" bsStyle="primary">
            {translate(props.lang, 'LOGIN_BTN')}
          </Button>
          </div>
        </Col>

      </Row>
      </form>
      <br/>
      {props.user.error &&
        <Alert bsStyle="danger" >
          <h4>{translate(props.lang, 'SORRY')}</h4>
          <p>{translate(props.lang, 'CHECK_INFO_CONNECTION')}</p>
        </Alert>
      }
    </CenterPanel>
    </div>
    </div>
  )
}

Login.propTypes = {
  onValidate : PropTypes.func.isRequired,
  redirectAfterLoginSuccess : PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    connected : PropTypes.bool.isRequired,
    error :  PropTypes.bool.isRequired
  }),
  lang: PropTypes.string.isRequired,
  redirectFromUserCreation: PropTypes.bool.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (email, password) => {
      dispatch(login(email, password))
    },
    redirectAfterLoginSuccess: () => {
      dispatch(redirectAfterLoginSuccess())
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, lang : state.lang, redirectFromUserCreation : state.displayOption.createUser.creationSuccess  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
