import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const CenterPanel = (props) => {

  let maxWidth = props.maxWidth ? props.maxWidth : "950px";

  return (
    <Panel style = {{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: maxWidth
      }}
       {...props} />
  )
}

CenterPanel.propTypes = {
  maxWidth : PropTypes.string
}

export default CenterPanel
