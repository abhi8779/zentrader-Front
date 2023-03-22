import { IconButton, ListItemIcon } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import AlertsTabContext from '../contexts/AlertTabsContext'
import { deleteAlert } from '../slices/alertSlice'

function AlertsActionMenuBtns({
  selectedStatus,
  search,
  pageConf,
  rowOriginal
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { editAlert, cloneAlert } = useContext(AlertsTabContext)

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem
          onClick={() => {
            dispatch(
              deleteAlert({
                params: {
                  status: selectedStatus !== 'all' ? selectedStatus : null,
                  search: search,
                  limit: pageConf.limit,
                  offset: pageConf.pageIndex * pageConf.limit
                },
                payload: rowOriginal.id
              })
            )
              .unwrap()
              .then((res) => toast.success(`1 alert deleted `))
              .catch((e) => toast.error(`Something went wrong`))
          }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Alert
        </MenuItem>
        {rowOriginal.status === 'active' && (
          <MenuItem
            onClick={() => {
              editAlert(rowOriginal)
            }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit Alert
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            cloneAlert(rowOriginal)
          }}>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          Clone Alert
        </MenuItem>
      </Menu>
    </>
  )
}

export default AlertsActionMenuBtns
