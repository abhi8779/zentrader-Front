import {
  Button,
  IconButton,
  lighten,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyListMessage from '../../../components/EmptyListMessage'
import PaddedProgressBar from '../../../components/PaddedProgressBar'
import EnhancedTable from '../../../components/Table/BasicReactTable'
import api from '../../../services/trader'
import { deleteOrder, getOrders, triggerOrder } from './orderSlice'

const useStyles = makeStyles((theme) => ({
  sectionTable: {
    marginTop: 16
  },
  sectionTop: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16
  },
  filterContainer: {
    padding: theme.spacing(2),
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    display: 'flex',
    alignItems: 'center'
  }
}))

export default function OrdersTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const orders = useSelector((s) => s.optionSell.orders.data?.original)

  React.useEffect(() => {
    dispatch(getOrders())
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Strike',
        // accessor: "strike",
        accessor: (rowData) => {
          return rowData.derivative
        },
        defaultCanFilter: true,
        disableFilters: true,
        Cell: function(row) {
          return (
            <div>
              <Typography variant="body1">
                {row.value.strike} {row.row.original.derivative.type}
              </Typography>
              <Typography variant="caption" style={{ color: grey[600] }}>
                {moment(row.row.original.derivative.expiry.date).format(
                  'Do MMMM'
                )}
              </Typography>
            </div>
          )
        }
      },
      {
        Header: 'Entry',
        accessor: (rowData) => {
          return rowData.entry_order.trigger
        },
        disableFilters: true
      },
      {
        Header: 'Target',
        accessor: (rowData) => {
          return rowData.target_order.trigger
        },
        disableFilters: true
      },
      {
        Header: 'SL',
        accessor: (rowData) => {
          return rowData.stoploss_order.trigger
        },
        disableFilters: true
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        disableFilters: true
      },
      {
        Header: 'Delete',
        accessor: 'id',
        disableFilters: true,
        Cell: function(row) {
          return (
            <div>
              <Tooltip title="Delete Order">
                <IconButton
                  onClick={() => {
                    dispatch(deleteOrder(row.row.original.id))
                  }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Trigger Order">
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(triggerOrder(row.row.original.id))
                  }}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      }
    ],
    [orders]
  )

  return (
    <>
      <Toolbar className={classes.filterContainer}>
        <div>
          <Typography variant="body2">
            Review your orders and click the button to download your order CSV.
            You can then upload the order CSV to Trade Tiger to place your
            orders.
          </Typography>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              api.OptionSell.Order.exportCsv()
            }}
            size="small">
            Download
          </Button>
        </div>
      </Toolbar>

      {orders && <EnhancedTable columns={columns} data={orders} />}

      {orders && orders.length === 0 && (
        <EmptyListMessage text="You have not added any orders yet. Go to the Marketwatch tab to add orders." />
      )}

      {!orders && <PaddedProgressBar />}
    </>
  )
}
