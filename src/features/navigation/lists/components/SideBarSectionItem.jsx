import TextIcon from '@/components/TextIcon'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const SideBarSectionItem = ({ item }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const isActive = pathname.includes(item?.path)
  const theme = useTheme()

  return (
    <List component="div" disablePadding>
      <ListItem
        button
        key={item.label}
        onClick={() => {
          history.push(item.path)
        }}>
        <ListItemIcon style={{ minWidth: 48 }}>
          {typeof item?.icon === 'string' ? (
            <TextIcon text={item?.icon} isActive={isActive} />
          ) : (
            <TextIcon icon={item?.icon?.()} isActive={isActive} />
          )}
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="body1"
            style={{
              color: isActive ? theme.palette.primary.main : grey[700],
              fontWeight: isActive ? 700 : 500
            }}>
            {item.label}
          </Typography>
        </ListItemText>
        <Divider />
      </ListItem>
    </List>
  )
}

export default SideBarSectionItem
