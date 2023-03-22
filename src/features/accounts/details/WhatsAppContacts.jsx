import PaddedProgressBar from '@/components/PaddedProgressBar'
import SmallChip from '@/components/SmallChip'
import { useConfirmationDialog } from '@/contexts/ConfirmContext'
import WCFormDialog from '@/features/accounts/dialogs/WCFormDialog'
import { updateUser } from '@/features/accounts/slices/userSlice'
import ZenApi from '@/services/trader'
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PhoneIcon from '@material-ui/icons/Phone'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WhatsAppContacts = () => {
  const [list, setList] = useState(null)
  const [open, setOpen] = useState(false)
  const [wc, setWc] = useState(null)
  const [addDisabled, setAddDisabled] = useState(false)
  const features = useSelector((s) => s.subscriptions.features)
  const dispatch = useDispatch()
  const { getConfirmation } = useConfirmationDialog()

  useEffect(() => {
    if (features && list) {
      let feature = features.filter((x) => x.feature === 'whatsapp')
      feature = feature ? feature[0] : null
      setAddDisabled(feature ? list.length >= feature.limit : false)
    }
  }, [list, features])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    try {
      const res = await ZenApi.Wati.get({
        ordering: '-id'
      })
      setList(res.data.results)
    } catch (error) {}
  }

  const editWC = (wc) => {
    setWc(wc)
    setOpen(true)
  }

  const createWc = (wc) => {
    setWc(null)
    setOpen(true)
  }

  const deleteWc = async (wc) => {
    if (
      await getConfirmation({
        title: `Delete contact?`,
        message: `Are you sure you want to delete this number? You wont receive alerts on this number anymore.`,
        btnConfirmText: 'Delete'
      })
    ) {
      await ZenApi.Wati.delete(wc.id)
      getList()
    }
  }

  return (
    <>
      {!list && (
        <>
          <PaddedProgressBar />
        </>
      )}
      {list && (
        <>
          {list?.map((wc) => (
            <Card
              elevation={0}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.12)',
                marginBottom: '5px'
              }}
              key={wc.id}>
              <Box mb={0} display="flex" alignItems="center" p={2}>
                <Avatar
                  style={{
                    marginRight: 6,
                    width: 30,
                    height: 30,
                    backgroundColor: green[500]
                  }}>
                  <PhoneIcon color="inherit" />
                </Avatar>
                <Box ml={3}>
                  <Typography variant="body1">{wc.phone_number}</Typography>
                  {wc.primary ? (
                    <SmallChip bgcolor={blue[500]} label="PRIMARY" />
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      style={{
                        fontSize: 10,
                        padding: '2.4px 4px'
                      }}
                      onClick={async () => {
                        await ZenApi.Wati.setPrimary(wc.id)
                        getList()

                        // Get user
                        const res = await ZenApi.User.get()
                        dispatch(updateUser(res.data))
                      }}>
                      Make Primary
                    </Button>
                  )}
                </Box>
                <Box ml="auto">
                  <Tooltip title="Edit Number">
                    <IconButton
                      onClick={() => {
                        editWC(wc)
                      }}
                      size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {!wc.primary && (
                    <Tooltip title="Delete Number">
                      <IconButton
                        onClick={() => {
                          deleteWc(wc)
                        }}
                        size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </Card>
          ))}
          <Box mt={2} textAlign="right">
            <Button
              onClick={createWc}
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<AddCircleIcon />}
              disabled={addDisabled}>
              Add New Number
            </Button>
          </Box>
        </>
      )}
      <WCFormDialog
        wc={wc}
        open={open}
        onClose={async () => {
          setOpen(false)
        }}
        onSuccess={() => {
          setOpen(false)
          getList()
        }}
      />
    </>
  )
}

export default WhatsAppContacts
