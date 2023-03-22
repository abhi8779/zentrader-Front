import theme from '@/theme'
import { Box, IconButton, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import React, { useEffect, useState } from 'react'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const ListPagination = ({ onChange, count }) => {
  const [offSet, setOffSet] = useState(0)
  const [limit, setLimit] = useState(10)
  useEffect(() => {
    onChange(offSet, limit)
  }, [offSet, limit])

  return (
    <Box
      display={'flex'}
      justifyContent="flex-end"
      style={{ gap: theme.spacing(2) }}>
      <LimitMenu
        limit={limit}
        onChange={(limit) => {
          setLimit(limit)
        }}
      />
      <OffsetBtns
        count={count}
        offSet={offSet}
        limit={limit}
        onChange={(offSet) => {
          setOffSet(offSet)
        }}
      />
    </Box>
  )
}

function LimitMenu({ limit, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      display={'flex'}
      height="50px"
      alignItems={'center'}
      style={{ gap: theme.spacing(1) }}>
      <Typography variant="body2">Items per page</Typography>
      <Button
        aria-controls="limit-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        endIcon={<ArrowDropDownIcon />}>
        {limit}
      </Button>
      <Menu
        id="limit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {[10, 25, 50].map((num) => (
          <MenuItem
            selected={limit === num}
            key={num}
            onClick={() => {
              handleClose()
              onChange(num)
            }}>
            {num}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

const OffsetBtns = ({ offSet, limit, onChange, count }) => {
  return (
    <Box display={'flex'} alignItems="center" style={{ gap: theme.spacing(2) }}>
      <Typography variant="body2">
        {' '}
        {limit * offSet} -{' '}
        {limit * offSet + limit > count ? count : limit * offSet + limit} of{' '}
        {count}
      </Typography>
      <IconButton
        disabled={offSet === 0}
        onClick={() => {
          onChange(offSet - 1)
        }}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        disabled={limit * offSet + limit > count}
        onClick={() => {
          onChange(offSet + 1)
        }}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}

export default ListPagination
