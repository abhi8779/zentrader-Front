import { Card } from '@material-ui/core'
import React from 'react'

const CustomCard = ({ children, ...props }) => {
  return (
    <Card elevation={3} {...props} style={{ ...props.style, borderRadius: 15 }}>
      {children}
    </Card>
  )
}

export default CustomCard
