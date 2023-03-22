import { Box, List, makeStyles, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'
import SideBarSectionItem from './components/SideBarSectionItem'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  }
}))

const SidebarSectionList = ({ items, label }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <List
        className={classes.list}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <Box px={2} display="flex" alignItems="center">
          <Box minWidth={48}>{items?.icon && items.icon()}</Box>
          <Typography variant="button" style={{ color: grey[500] }}>
            {label}
          </Typography>
        </Box>
        {items.map((item) => (
          <SideBarSectionItem key={item.label} item={item} />
        ))}
      </List>
    </React.Fragment>
  )
}

export default SidebarSectionList
