import EmptyListMessage from '@/components/EmptyListMessage'
import IncDecButton from '@/components/IncDecButton'
import PaddedProgressBar from '@/components/PaddedProgressBar'
import EnhancedTable from '@/components/Table/BasicReactTable'
import { updateItemQuantity } from '@/pages/OptionSell/Cart/cartSlice'
import { useGetStrikesQuery } from '@/services/optionSell'
import { lighten, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function StrikesTable() {
  const classes = useStyles()
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const { data: strikeMeasures, isLoading } = useGetStrikesQuery(filters)

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
            <Typography
              variant="body1"
              style={{
                color: row.row.original.qualifying ? green[700] : 'black',
                fontWeight: row.row.original.qualifying ? 'bold' : 'normal'
              }}>
              {row.row.original.derivative.strike}{' '}
              {row.row.original.derivative.type}
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
        id: 'instrument',
        Header: 'Instrument',
        accessor: (rowData) => {
          return rowData.derivative.instrument.name
        },
        disableFilters: true
      },
      {
        id: 'expirytype',
        Header: 'Type',
        accessor: (rowData) => {
          return rowData.derivative.expiry.type
        },
        disableFilters: true
      },
      {
        id: 'type',
        Header: 'Type',
        accessor: (rowData) => {
          return rowData.derivative.type
        },
        disableFilters: true
      },
      {
        id: 'expiry',
        Header: 'Expiry',
        accessor: (rowData) => {
          return moment(rowData.derivative.expiry.date).format('Do MMMM')
        },
        disableFilters: true
      },
      {
        Header: 'Entry',
        accessor: 'entry',
        disableFilters: true
      },
      {
        Header: 'Target',
        accessor: 'target',
        disableFilters: true
      },
      {
        Header: 'SL',
        accessor: 'stoploss',
        disableFilters: true
      },
      {
        Header: 'OI',
        accessor: (rowData) => {
          return rowData.derivative.oi
        },
        Cell: (row) => {
          return <div className={classes.qsCell}>{row.value / 1000 + 'k'}</div>
        },
        disableFilters: true
      },
      {
        Header: 'Risk per Lot',
        accessor: 'risk_per_lot',
        disableFilters: true
      },
      {
        Header: 'Qualifying',
        accessor: 'qualifying',
        disableFilters: true,
        isHidden: true,
        Cell: (row) => {
          return (
            <div className={classes.qsCell}>
              <Typography variant="body1">
                {row.value ? 'Yes' : 'No'}
              </Typography>
            </div>
          )
        }
      },
      {
        Header: 'Add to Order',
        accessor: 'orders',
        disableFilters: true,
        Cell: (row) => {
          return (
            <div>
              <IncDecBtn strikeMeasure={row.row.original} />
            </div>
          )
        }
      }
    ],
    []
  )

  return (
    <>
      {strikeMeasures && (
        <EnhancedTable
          columns={columns}
          data={strikeMeasures}
          initialState={{
            hiddenColumns: [
              'qualifying',
              'type',
              'expiry',
              'expirytype',
              'instrument'
            ]
          }}
        />
      )}

      {strikeMeasures && strikeMeasures.length === 0 && (
        <EmptyListMessage text="No strikes matching your filters were found" />
      )}

      {isLoading && <PaddedProgressBar />}
    </>
  )
}

const IncDecBtn = ({ strikeMeasure }) => {
  const item = useSelector((s) => s.optionSell.cart.items[strikeMeasure.id])
  const dispatch = useDispatch()
  return (
    <IncDecButton
      value={item ? item.quantity : 0}
      onChange={async (count) => {
        dispatch(
          updateItemQuantity({
            strikeMeasureId: strikeMeasure.id,
            quantity: count
          })
        )
      }}
      step={strikeMeasure.derivative.instrument.lot_size}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  sectionTable: {
    // minWidth: 650,
    marginTop: 16
  },
  tableHint: {
    display: 'block',
    padding: 16
  },
  tableSelect: {
    marginRight: 8
  },
  qSCellMain: {
    // fontSize: 12,
  },
  qSCellSecondary: {
    fontSize: 14,
    color: 'grey'
  },
  filterContainer: {
    padding: theme.spacing(2),
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    display: 'flex',
    alignItems: 'center'
  },
  filterWrap: {
    marginRight: 16
  }
}))
