import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const CenterPanel = (props) => {

  let maxWidth = props.maxWidth ? props.maxWidth : '950px'
  let marginTop = props.marginTop ? props.marginTop : '0px'

  let cleanProps = Object.assign({}, props)

  props.maxWidth ? (delete cleanProps.maxWidth) : true

  return (
    <Panel style = {{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth,
      marginTop
    }}
       {...cleanProps} />
  )
}

CenterPanel.propTypes = {
  maxWidth : PropTypes.string,
  marginTop : PropTypes.string
}

export default CenterPanel
