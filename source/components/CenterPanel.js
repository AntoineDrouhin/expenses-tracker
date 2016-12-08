import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const CenterPanel = (props) => {

  let maxWidth = props.maxWidth ? props.maxWidth : "950px";

  let cleanProps = Object.create(props)
  delete cleanProps.maxWidth

  return (
    <Panel style = {{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: maxWidth
      }}
       {...cleanProps} />
  )
}

CenterPanel.propTypes = {
  maxWidth : PropTypes.string
}

export default CenterPanel
