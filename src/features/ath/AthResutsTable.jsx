import ErrorMessage from '@/components/ErrorMessage'
import LoadingBar from '@/components/LoadingBar'
import SmallChip from '@/components/SmallChip'
import StockPrice from '@/components/StockPrice'
import PaginatedTable from '@/components/Table/PaginatedTable'
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { blue, green, grey, purple, red } from '@material-ui/core/colors'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FilterListIcon from '@material-ui/icons/FilterList'
import { debounce } from 'lodash'
import moment from 'moment'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchField from '../../components/SearchField'
import { getAthPortfolio } from './athPortfolio/slices/athPortfolioSlice'
import SortBySelectField from './fields/SortBySelectField'
import StatusSelectField from './fields/StatusSelectField'
import TradeStatusSelectField from './fields/TradeStatusSelectField'
import VersionSelectField from './fields/VersionSelectField'

const AthResultsTable = ({
  data,
  counts,
  loading,
  extraColumns = [],
  onFilterChange
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const firstRender = useRef()
  const [pageConf, setPageConf] = useState({})
  const [filters, setFilters] = useState({
    version__in: ['MCC']
  })
  const statusMap = {
    All: [
      'NIL',
      'CC',
      'Entry',
      'Target 1',
      'Target 2',
      'Target 3',
      'Target 4',
      'Target 5'
    ],
    ON: ['Entry', 'Target 1', 'Target 2', 'Target 3', 'Target 4', 'Target 5'],
    CC: [],
    NIL: []
  }

  useEffect(() => {
    const limit = pageConf.pageSize
    const offset = pageConf.pageSize * pageConf.pageIndex

    onFilterChange &&
      typeof onFilterChange === 'function' &&
      onFilterChange({
        limit,
        offset,
        ...filters,
        version__in: filters.version__in.join(',')
      })
  }, [filters, pageConf])

  useEffect(() => {
    dispatch(getAthPortfolio())
  }, [])

  useEffect(() => {
    firstRender.current = true
  }, [])

  const updateFilters = useCallback((key, value) => {
    if (firstRender.current) {
      setFilters((filters) => {
        const state = { ...filters }
        if (!value) {
          delete state[key]
        } else {
          state[key] = value
        }
        if (
          state.status &&
          !statusMap[state.status].includes(state.trade_status)
        ) {
          delete state.trade_status
        }
        return { ...state }
      })
    }
  }, [])

  return (
    <>
      <ListFilters
        filters={filters}
        setFilters={setFilters}
        statusMap={statusMap}
        updateFilters={updateFilters}
      />

      <Divider />

      <AthTable
        counts={counts}
        loading={loading}
        data={data}
        setPageConf={setPageConf}
        emptyListMessage={'No data found for the current filters'}
        extraColumns={extraColumns}
        onRowClick={(row) => {
          history.push(`/ath/details/${row.instrument.id}/`)
        }}
      />
    </>
  )
}

const AthTable = ({
  counts,
  data,
  loading,
  extraColumns,
  setPageConf,
  emptyListMessage,
  onRowClick
}) => {
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const error = useSelector((s) => s.ath.athList.fetchError)

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Symbol',
          disableFilters: true,
          Cell: (row) => {
            const status = row.row.original.status
            let color = grey[500]
            switch (status) {
              case 'CC':
                color = green[500]
                break

              case 'ON':
                color = blue[500]
                break

              default:
                break
            }

            const versionColMap = {
              MCC: green[300],
              DCC: purple[500],
              WCC: red[500]
            }
            const tradeStatus = row.row.original.trade_status
            return (
              <>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    style={{ fontWeight: 700, color: color }}>
                    {row.row.original.instrument.tradingsymbol}
                  </Typography>
                  <StockPrice
                    ml={1}
                    price={row.row.original.instrument.last_price}
                  />
                </Box>
                <>
                  <SmallChip
                    label={row.row.original.version}
                    bgColor={versionColMap[row.row.original.version]}
                    mr={0.5}
                    fontWeight={700}
                  />
                  <SmallChip
                    label={status}
                    bgColor={color}
                    mr={0.5}
                    fontWeight={700}
                  />
                  {tradeStatus && tradeStatus !== 'CC' && (
                    <SmallChip
                      label={tradeStatus}
                      bgColor={grey[400]}
                      // color={grey[800]}
                      fontWeight={700}
                    />
                  )}
                </>
              </>
            )
          }
        },
        {
          Header: 'Market Cap/Age',
          disableFilters: true,
          Cell: (row) => {
            return (
              <>
                <Typography variant="body2">
                  {row.row.original.instrument.market_cap} Cr
                </Typography>
                <Typography variant="body2">
                  {moment().diff(
                    moment(row.row.original.instrument.inception_date),
                    'years'
                  ) +
                    'y ' +
                    (moment().diff(
                      moment(row.row.original.instrument.inception_date),
                      'months'
                    ) %
                      12) +
                    'm'}
                </Typography>
              </>
            )
          }
        },
        {
          Header: 'RH',
          disableFilters: true,
          Cell: (row) => (
            <LableValueDateChip
              value={row.row.original.ath}
              date={row.row.original.ath_date}
            />
          )
        },
        {
          Header: 'CC ',
          disableFilters: true,
          Cell: (row) => (
            <LableValueDateChip
              value={row.row.original.cc}
              date={row.row.original.cc_date}
            />
          )
        },
        {
          Header: 'Entry',
          disableFilters: true,
          Cell: (row) => (
            <LableValueDateChip
              value={row.row.original.entries?.[0]?.trigger}
              date={row.row.original.entries?.[0]?.triggered_at}
            />
          )
        },
        {
          Header: 'Targets',
          disableFilters: true,
          Cell: (row) => (
            <LableValueDateChip
              value={
                row.row.original.targets?.find(
                  (data) => data.status === 'ACTIVE'
                )?.trigger
              }
              label={
                row.row.original.targets?.find(
                  (data) => data.status === 'ACTIVE'
                )?.name
              }
            />
          )
        },

        {
          Header: 'SL',
          disableFilters: true,
          Cell: (row) => (
            <LableValueDateChip
              value={row.row.original.stoplosses?.[0]?.trigger}
              date={row.row.original.stoplosses?.[0]?.triggered_at}
            />
          )
        },
        ...extraColumns
      ].filter((x) => Boolean(x)),
    []
  )
  const columnsMob = useMemo(
    () =>
      [
        {
          Header: 'Symbol',
          disableFilters: true,
          Cell: (row) => {
            const status = row.row.original.status
            let color = grey[500]
            switch (status) {
              case 'CC':
                color = green[500]
                break

              case 'ON':
                color = blue[500]
                break

              default:
                break
            }

            const versionColMap = {
              MCC: green[300],
              DCC: purple[500],
              WCC: red[500]
            }
            const tradeStatus = row.row.original.trade_status
            return (
              <>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    style={{ fontWeight: 700, color: color, fontSize: '10px' }}>
                    {row.row.original.instrument.tradingsymbol}
                  </Typography>
                  <StockPrice
                    ml={1}
                    price={row.row.original.instrument.last_price}
                  />
                </Box>
                <>
                  <SmallChip
                    label={row.row.original.version}
                    bgColor={versionColMap[row.row.original.version]}
                    mr={0.5}
                    style={{ fontSize: '7px' }}
                    fontWeight={700}
                  />
                  <SmallChip
                    label={status}
                    bgColor={color}
                    mr={0.5}
                    style={{ fontSize: '7px' }}
                    fontWeight={700}
                  />
                  {tradeStatus && tradeStatus !== 'CC' && (
                    <SmallChip
                      label={tradeStatus}
                      bgColor={grey[400]}
                      style={{ fontSize: '7px' }}
                      // color={grey[800]}
                      fontWeight={700}
                    />
                  )}
                </>
              </>
            )
          }
        },
        {
          Header: 'Market Cap/Age',
          disableFilters: true,
          Cell: (row) => {
            return (
              <>
                <Typography variant="body2" style={{ fontSize: '12px' }}>
                  {row.row.original.instrument.market_cap} Cr
                </Typography>
                <Typography variant="body2" style={{ fontSize: '12px' }}>
                  {moment().diff(
                    moment(row.row.original.instrument.inception_date),
                    'years'
                  ) +
                    'y ' +
                    (moment().diff(
                      moment(row.row.original.instrument.inception_date),
                      'months'
                    ) %
                      12) +
                    'm'}
                </Typography>
              </>
            )
          }
        },

        ...extraColumns
      ].filter((x) => Boolean(x)),
    []
  )

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setPageConf({
      pageIndex,
      pageSize
    })
  }, [])
  return (
    <>
      {loading && <LoadingBar dataArray={data} />}
      {error && (
        <Box m={2}>
          <ErrorMessage errorStatus={error?.payload?.response?.status} />
        </Box>
      )}
      {data && !error && (
        <PaginatedTable
          fetchData={fetchData}
          pageCount={counts}
          columns={smallScreen ? columnsMob : columns}
          data={data || []}
          emptyListMessage={emptyListMessage}
          onRowClick={onRowClick}
        />
      )}
    </>
  )
}

const ListFilters = ({ filters, statusMap, updateFilters }) => {
  const theme = useTheme()
  const [search, setSearch] = useState('')
  const [expand, setExpand] = useState(false)
  const firstRender = useRef()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const showFilterSelect = () => {
    setExpand((prevCheck) => !prevCheck)
  }

  useEffect(() => {
    firstRender.current = true
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      setSearchFilter(search)
    }
  }, [search])

  const setSearchFilter = React.useCallback(
    debounce(
      (search) => {
        updateFilters('search', search)
      },
      500,
      { maxWait: 1500 }
    ),
    []
  )

  return (
    <>
      <Box my={2} mx={2}>
        <Grid container spacing={2}>
          {smallScreen && (
            <Grid item xs={12} lg={4}>
              <Box
                display="flex"
                style={{ gap: theme.spacing(2) }}
                justifyContent="space-between">
                <SearchField
                  value={search}
                  label={'Search'}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />

                <FilterExpandBtn
                  expand={expand}
                  onClick={() => showFilterSelect()}
                />
              </Box>
            </Grid>
          )}

          {(expand || !smallScreen) && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3} md={2} lg={2}>
                  <Box
                    display="flex"
                    style={{ gap: theme.spacing(2) }}
                    alignItems={'center'}>
                    {!smallScreen && <FilterListIcon color="disabled" />}
                    <VersionSelectField
                      onChange={(e) => {
                        updateFilters(
                          'version__in',
                          e.target.value || undefined
                        )
                      }}
                      value={filters.version__in}
                    />
                  </Box>
                </Grid>
                {!smallScreen && (
                  <Grid item xs={6} sm={4} md={4} lg={4}>
                    <SearchField
                      value={search}
                      label={'Search'}
                      onChange={(e) => {
                        setSearch(e.target.value)
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={6} sm={3} md={2} lg={2}>
                  <StatusSelectField
                    label="Status"
                    value={filters.status}
                    onChange={(e) => {
                      updateFilters('status', e.target.value || undefined)
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={2} lg={2}>
                  <TradeStatusSelectField
                    label={'Trade Status'}
                    statusMap={statusMap}
                    status={filters.status}
                    value={filters.trade_status}
                    onChange={(e) => {
                      updateFilters('trade_status', e.target.value || undefined)
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={2} lg={2}>
                  <SortBySelectField
                    label={'Sort By'}
                    value={filters.ordering}
                    filters={filters}
                    onChange={(e) => {
                      updateFilters('ordering', e.target.value || undefined)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  )
}

const FilterExpandBtn = ({ onClick, expand }) => {
  return (
    <Button
      style={{ width: ' 150px' }}
      variant="outlined"
      color="primary"
      size="small"
      onClick={onClick}
      endIcon={expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}>
      Filters
    </Button>
  )
}
const LableValueDateChip = ({ label, value, date }) => {
  const formatDate = (date) => {
    if (!date) {
      return ''
    }
    return moment(date, 'YYYY-MM-DD').format('MMM Do YYYY')
  }

  return (
    <>
      <Typography variant="body2">{value}</Typography>
      <Typography variant="caption">{formatDate(date)}</Typography>
      <Typography variant="caption">{label}</Typography>
    </>
  )
}

export default memo(AthResultsTable)
