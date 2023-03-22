import {
  useGetExpiriresQuery,
  useGetInstrumentsQuery
} from '@/services/marketdata'
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  lighten,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilters } from '../strikeMeasureSlice'

const StrikesMeasureFilters = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <InstrumentFilter />
      <ExpiryTypeFilter />
      <TypeFilter />
      <ExpiryFilter />
      <QualifyingFilter />
    </div>
  )
}

const InstrumentFilter = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const { data: instruments, isLoading } = useGetInstrumentsQuery({
    type: 'index'
  })

  if (isLoading) {
    return null
  }

  return (
    <FormControl variant="outlined" size="small" className={classes.filterWrap}>
      <InputLabel shrink>Index</InputLabel>
      <Select
        value={
          filters?.derivative__instrument ? filters?.derivative__instrument : ''
        }
        onChange={(e) => {
          dispatch(
            updateFilters({
              key: 'derivative__instrument',
              value: e.target.value
            })
          )
        }}
        label="Index"
        displayEmpty>
        <MenuItem value="" selected>
          All Indexes
        </MenuItem>
        {instruments?.results.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

const ExpiryFilter = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const { data: expiries, isLoading } = useGetExpiriresQuery()

  if (isLoading) {
    return null
  }

  return (
    <FormControl variant="outlined" size="small" className={classes.filterWrap}>
      <InputLabel shrink>Expiry</InputLabel>
      <Select
        value={filters?.derivative__expiry ? filters?.derivative__expiry : ''}
        onChange={(e) => {
          dispatch(
            updateFilters({
              key: 'derivative__expiry',
              value: e.target.value
            })
          )
        }}
        label="Index"
        displayEmpty>
        <MenuItem value="" selected>
          All
        </MenuItem>
        {expiries?.results.map((item) => {
          return (
            <MenuItem value={item.id} key={item.id}>
              {moment(item.date).format('Do MMMM')}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

const ExpiryTypeFilter = () => {
  const classes = useStyles()
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const dispatch = useDispatch()

  return (
    <FormControl variant="outlined" size="small" className={classes.filterWrap}>
      <InputLabel shrink>Expiry Type</InputLabel>
      <Select
        value={filters?.type ? filters?.type : ''}
        onChange={(e) => {
          dispatch(
            updateFilters({
              key: 'type',
              value: e.target.value
            })
          )
        }}
        label="Expiry Type"
        displayEmpty>
        <MenuItem value="weekly" selected>
          Weekly
        </MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
      </Select>
    </FormControl>
  )
}

const TypeFilter = () => {
  const classes = useStyles()
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const dispatch = useDispatch()

  return (
    <FormControl variant="outlined" size="small" className={classes.filterWrap}>
      <InputLabel shrink>Type</InputLabel>
      <Select
        value={filters?.derivative__type ? filters?.derivative__type : ''}
        onChange={(e) => {
          dispatch(
            updateFilters({
              key: 'derivative__type',
              value: e.target.value
            })
          )
        }}
        label="Type"
        displayEmpty>
        <MenuItem value="PE" selected>
          PE
        </MenuItem>
        <MenuItem value="CE">CE</MenuItem>
      </Select>
    </FormControl>
  )
}

function QualifyingFilter() {
  const filters = useSelector((s) => s.optionSell.strikeMeasures.filters)
  const dispatch = useDispatch()
  return (
    <FormControlLabel
      style={{ marginRight: 16 }}
      control={
        <Checkbox
          checked={filters.qualifying || false}
          onChange={(event) => {
            dispatch(
              updateFilters({
                key: 'qualifying',
                value: event.target.checked
              })
            )
          }}
          name="checkedB"
          color="primary"
        />
      }
      label="Show only qualifying strikes"
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

export default StrikesMeasureFilters
