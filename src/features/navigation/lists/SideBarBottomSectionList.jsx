import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import React, { useContext } from 'react'
import useReportBtnDialog from '../../../components/Dialog/ReportBtnDialog'
import NavigationContext from '../contexts/NavigationContext'
import SideBarSectionItem from './components/SideBarSectionItem'

const useStyles = makeStyles((theme) => ({
  bottomBox: {
    bottom: theme.spacing(3),
    position: 'absolute',
    left: 0,
    right: 0
  }
}))

const SideBarBottomSectionList = () => {
  const { showReportBtnDialog } = useReportBtnDialog()
  const { bottomMenu } = useContext(NavigationContext)
  const classes = useStyles()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      className={classes.bottomBox}>
      {bottomMenu.map((item) => (
        <SideBarSectionItem key={item.label} item={item} />
      ))}

      <List component="div" disablePadding>
        <ListItem
          button
          onClick={() => {
            showReportBtnDialog()
          }}>
          <ListItemIcon style={{ minWidth: 48 }}>
            <ErrorOutlineIcon
              style={{
                color: grey[700],
                fontSize: '28px'
              }}
              fontSize="large"
            />
            ,
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="body1"
              style={{
                color: grey[700],
                fontWeight: 500
              }}>
              Report
            </Typography>
          </ListItemText>
          <Divider />
        </ListItem>
      </List>
    </Box>
  )
}

export default SideBarBottomSectionList
