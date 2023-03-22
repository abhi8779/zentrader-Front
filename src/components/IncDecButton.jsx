import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import React from 'react'

const IncrementDecrementButton = ({
  value = 0,
  onChange,
  initialValue = 0,
  step = 1
}) => {
  const handleIncrement = () => {
    onChange(value + step)
  }

  const handleDecrement = () => {
    if (value - step >= 0) {
      onChange(value - step)
    }
  }

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleIncrement}>+</Button>
      {value && <Button disabled>{value}</Button>}
      {value && <Button onClick={handleDecrement}>-</Button>}
    </ButtonGroup>
  )
}

export default IncrementDecrementButton
