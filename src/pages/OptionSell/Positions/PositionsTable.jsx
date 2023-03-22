import EmptyListMessage from '@/components/EmptyListMessage'
import PaddedProgressBar from '@/components/PaddedProgressBar'
import EnhancedTable from '@/components/Table/BasicReactTable'
import { deletePosition } from '@/pages/OptionSell/Positions/positionSlice'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PositionsTable = () => {
  const dispatch = useDispatch()
  const positions = useSelector((s) => s.optionSell.positions.data?.original)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Strike',
        accessor: (rowData) => {
          return rowData.derivative.strike
        },
        defaultCanFilter: true,
        disableFilters: true,
        Cell: (row) => (
          <div>
            <Typography variant="body1">
              {row.value} {row.row.original.derivative.type}
            </Typography>
            <Typography variant="caption" style={{ color: grey[600] }}>
              {moment(row.row.original.derivative.expiry.date).format(
                'Do MMMM'
              )}
            </Typography>
          </div>
        )
      },
      {
        Header: 'Entry',
        accessor: 'entry_at',
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
        Header: 'Risk',
        accessor: 'risk',
        disableFilters: true
      },
      {
        Header: 'Delete',
        accessor: 'id',
        disableFilters: true,
        Cell: function(row) {
          return (
            <div>
              <Tooltip title="Delete Position">
                <IconButton
                  onClick={() => {
                    dispatch(deletePosition(row.row.original.id))
                  }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      }
    ],
    [positions]
  )

  return (
    <>
      {positions && <EnhancedTable columns={columns} data={positions} />}

      {positions && positions.length === 0 && (
        <EmptyListMessage text="You have not added any positions yet. Click on Upload CSV to add positions." />
      )}

      {!positions && <PaddedProgressBar />}
    </>
  )
}

export default PositionsTable
