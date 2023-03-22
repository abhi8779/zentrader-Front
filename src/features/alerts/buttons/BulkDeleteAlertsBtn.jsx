import { useConfirmationDialog } from '@/contexts/ConfirmContext'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { bulkDeleteAlerts } from '../slices/alertSlice'

export const BulkDeleteAlertsBtn = ({
  selectAllChecked,
  selectedStatus,
  counts,
  pageConf,
  onSuccess,
  selectedAlerts,
  ...props
}) => {
  const { getConfirmation } = useConfirmationDialog()
  const dispatch = useDispatch()

  const bulkDeleteAlertsDel = async (ids) => {
    const confirmed = await getConfirmation({
      title: `Delete alerts`,
      message: `Do you want to delete ${
        selectAllChecked ? counts : ids.length
      } alert(s)?`,
      btnConfirmText: 'Delete',
      btnDismissText: 'Cancel'
    })

    if (!confirmed) {
      return
    }

    dispatch(
      bulkDeleteAlerts({
        params: selectAllChecked ? { all: true } : { ids: ids },
        payload: {
          status: selectedStatus !== 'all' ? selectedStatus : null,
          limit: pageConf.limit,
          offset: 0
        }
      })
    )
      .unwrap()
      .then((res) =>
        toast.success(
          `${res.alertsDeleted} ${
            res.alertsDeleted > 1 ? 'alerts' : 'alert'
          }  deleted `
        )
      )
      .catch((e) => toast.error(`Something went wrong`))

    onSuccess && onSuccess()
  }

  return (
    <Button
      variant="text"
      color="inherit"
      onClick={() => {
        bulkDeleteAlertsDel(Array.from(selectedAlerts))
      }}
      style={{
        marginRight: 8,
        marginTop: 2
      }}
      size="small"
      startIcon={<DeleteIcon />}
      disabled={!(selectedAlerts && selectedAlerts.size > 0)}
      {...props}>
      Delete alert(s)
    </Button>
  )
}

export default BulkDeleteAlertsBtn
