import ErrorMessage from '@/components/ErrorMessage'
import LoadingBar from '@/components/LoadingBar'
import SearchField from '@/components/SearchField'
import PaginatedTable from '@/components/Table/PaginatedTable'
import AlertsTabContext from '@/features/alerts/contexts/AlertTabsContext'
import StatusSelectField from '@/features/alerts/fields/StatusSelectField'
import { deleteAlert, updateFilters } from '@/features/alerts/slices/alertSlice'
import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import { blue, green, grey, red } from '@material-ui/core/colors'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import RefreshIcon from '@material-ui/icons/Refresh'
import SortIcon from '@material-ui/icons/Sort'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { round } from 'lodash'
import moment from 'moment'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AlertsActionMenuBtns from '../buttons/AlertsActionMenuBtns'
import BulkAlertsMenuBtn from '../buttons/BulkAlertsMenuBtn'
import BulkDeleteAlertsBtn from '../buttons/BulkDeleteAlertsBtn'
import CreateAlertsBtn from '../buttons/CreateAlertsBtn'
import InstrumentLabel from '../components/InstrumentLabel'
import AlertStatusChip from './components/AlertStatusChip'
import AlertStatusMob from './components/AlertStatusMob'
import InstrumentLabelMobile from './components/InstrumentLabelMobile'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2)
  }
}))

function AlertsTable({ childFunc }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedAlerts, setSelectedAlerts] = useState(new Set())
  const { editAlert, cloneAlert } = useContext(AlertsTabContext)
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const alerts = useSelector((s) => s.alert.results)
  const counts = useSelector((s) => s.alert.counts)
  const loading = useSelector((s) => s.alert.isLoading)
  const error = useSelector((s) => s.alert.fetchError)
  const [pageConf, setPageConf] = useState({
    limit: 10,
    pageIndex: 0
  })

  useEffect(() => {
    isLoggedIn && refreshAlerts()
  }, [selectedStatus, search, isLoggedIn, pageConf])

  const refreshAlerts = () => {
    dispatch(
      updateFilters({
        status: selectedStatus !== 'all' ? selectedStatus : null,
        search: search,
        limit: pageConf.limit,
        offset: pageConf.pageIndex * pageConf.limit
      })
    )
  }

  const columns = useMemo(() => {
    const list = !smallScreen
      ? [
          {
            Header: function(row) {
              return (
                <Checkbox
                  checked={selectAllChecked}
                  onChange={(e) => {
                    setSelectAllChecked((prevValue) => !prevValue)
                    if (!selectAllChecked) {
                      setSelectedAlerts(new Set(alerts?.map((x) => x.id)))
                    } else {
                      setSelectedAlerts(new Set())
                    }
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )
            },
            accessor: 'status',
            Cell: function(row) {
              const checked = selectedAlerts.has(row.row.original.id)
              return (
                <Checkbox
                  checked={checked || selectAllChecked}
                  onChange={(e) => {
                    setSelectedAlerts((alerts) => {
                      if (e.target.checked) {
                        alerts.add(row.row.original.id)
                        alerts.size === counts && setSelectAllChecked(true)
                      } else {
                        alerts.delete(row.row.original.id)
                        alerts.size !== counts && setSelectAllChecked(false)
                      }
                      return new Set(alerts)
                    })
                  }}
                  inputProps={{ 'aria-label': 'alert select checkbox' }}
                />
              )
            },
            disableFilters: true,
            disableSortBy: true
          },
          {
            Header: 'Status',
            accessor: (rowData) => {
              return rowData.status
            },
            disableFilters: true,
            Cell: function(row) {
              return <AlertStatusChip status={row.row.original.status} />
            }
          },
          {
            Header: 'Time',
            id: 'createdAt',
            accessor: (rowData) => {
              return moment(
                rowData.triggered_at ? rowData.triggered_at : rowData.created
              ).format('DD MMM YYYY, h:mm:ss a')
            },
            disableFilters: true,
            Cell: function(row) {
              const triggered = Boolean(row.row.original.triggered_at)
              const time = row.row.original.triggered_at
                ? row.row.original.triggered_at
                : row.row.original.created
              return (
                <>
                  <Typography
                    style={{
                      fontWeight: 700,
                      color: triggered ? blue[500] : green[500]
                    }}
                    variant="caption">
                    {triggered ? 'TRIGGERED' : 'CREATED'}
                  </Typography>
                  <br />
                  {moment(time).format('DD MMM YYYY')}
                  <br />
                  {moment(time).format('h:mm:ss a')}
                </>
              )
            }
          },
          {
            Header: 'Scrip',
            // accessor: "strike",
            accessor: (rowData) => {
              return rowData.instrument
            },
            defaultCanFilter: true,
            disableFilters: true,
            Cell: function(row) {
              return (
                <InstrumentLabel instrument={row.row.original.instrument} />
              )
            }
          },
          {
            Header: 'Condition',
            accessor: 'strike',
            Cell: function(row) {
              const opLabel = {
                gte: 'Above',
                lte: 'Below'
              }
              return (
                <>
                  <Typography variant="subtitle2" color="textPrimary">
                    {opLabel[row.row.original.operator]}{' '}
                    {round(row.row.original.trigger_value, 4)}
                  </Typography>
                  <Box
                    style={{
                      marginLeft: 'auto',
                      fontSize: 12,
                      color: green[400]
                    }}
                    display="flex"
                    alignItems="center">
                    <TrendingUpIcon
                      fontSize="inherit"
                      style={{ marginRight: 8 }}
                    />
                    <Typography
                      variant="caption"
                      color="primary"
                      style={{ fontWeight: 700 }}>
                      {'LTP '}
                      {row.row.original.ltp}
                    </Typography>
                  </Box>
                </>
              )
            },
            disableFilters: true,
            disableSortBy: true
          },
          {
            Header: 'Message',
            // accessor: "strike",
            accessor: (rowData) => {
              return rowData.message
            },
            defaultCanFilter: true,
            disableFilters: true,
            disableSortBy: true,
            Cell: function(row) {
              return (
                <Tooltip
                  title={
                    <Typography variant="body2">
                      {row.row.original.message}
                    </Typography>
                  }>
                  <Typography
                    noWrap
                    component="div"
                    variant="caption"
                    color="textPrimary"
                    style={{ fontWeight: 500, width: 60 }}>
                    {row.row.original.message || '-'}
                  </Typography>
                </Tooltip>
              )
            }
          },
          {
            Header: 'Actions',
            accessor: 'id',
            disableFilters: true,
            Cell: function(row) {
              return (
                <div>
                  <Tooltip title="Delete Alert">
                    <IconButton
                      onClick={() => {
                        dispatch(
                          deleteAlert({
                            params: {
                              status:
                                selectedStatus !== 'all'
                                  ? selectedStatus
                                  : null,
                              search: search,
                              limit: pageConf.limit,
                              offset: pageConf.pageIndex * pageConf.limit
                            },
                            payload: row.row.original.id
                          })
                        )
                          .unwrap()
                          .then((res) => {
                            toast.success(`1 alert deleted `)
                            setSelectedAlerts((prevValue) => {
                              prevValue.delete(row.row.original.id)
                              return prevValue
                            })
                          })
                          .catch((e) => toast.error(`Something went wrong`))
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {row.row.original.status === 'active' && (
                    <Tooltip title="Edit Alert">
                      <IconButton
                        onClick={() => {
                          editAlert(row.row.original)
                        }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Clone Alert">
                    <IconButton
                      onClick={() => {
                        cloneAlert(row.row.original)
                      }}>
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )
            },
            disableSortBy: true
          }
        ]
      : [
          {
            Header: ' ',
            accessor: (rowData) => {
              return rowData.status
            },
            disableFilters: true,
            Cell: function(row) {
              return <AlertStatusMob status={row.row.original.status} />
            }
          },

          {
            Header: 'Scrip',
            // accessor: "strike",
            accessor: (rowData) => {
              return rowData.instrument
            },
            defaultCanFilter: false,
            disableFilters: true,
            Cell: function(row) {
              return (
                <InstrumentLabelMobile
                  instrument={row.row.original.instrument}
                />
              )
            }
          },
          {
            Header: 'Condition',
            accessor: 'strike',
            Cell: function(row) {
              const opLabel = {
                gte: 'Above',
                lte: 'Below'
              }
              return (
                <>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    style={{ fontSize: '10px' }}>
                    {opLabel[row.row.original.operator]}{' '}
                    {round(row.row.original.trigger_value, 4)}
                  </Typography>
                  <Box
                    style={{
                      marginLeft: 'auto',
                      fontSize: 12,
                      color: green[400]
                    }}
                    display="flex"
                    alignItems="center">
                    <TrendingUpIcon
                      fontSize="inherit"
                      style={{ marginRight: 8 }}
                    />
                    <Typography
                      variant="caption"
                      color="primary"
                      style={{ fontWeight: 700, fontSize: '8px' }}>
                      {'LTP '}
                      {row.row.original.ltp}
                    </Typography>
                  </Box>
                </>
              )
            },
            disableFilters: true,
            disableSortBy: true
          },
          {
            Header: <SortIcon />,
            accessor: 'id',
            disableFilters: true,
            Cell: function(row) {
              return (
                <div>
                  <AlertsActionMenuBtns
                    selectedStatus={selectedStatus}
                    search={search}
                    pageConf={pageConf}
                    rowOriginal={row.row.original}
                  />
                </div>
              )
            },
            disableSortBy: true
          }
        ]
    return list
  }, [alerts, selectedAlerts, selectAllChecked, smallScreen])

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setPageConf({
      limit: pageSize,
      pageIndex
    })
  }, [])

  return (
    <>
      <NotLoggedInAlertsUi />
      <Divider />
      <AlertToolBar
        counts={counts}
        refreshAlerts={refreshAlerts}
        selectedStatus={selectedStatus}
        pageConf={pageConf}
        alerts={alerts}
        selectAllChecked={selectAllChecked}
        selectedAlerts={selectedAlerts}
        setSelectAllChecked={setSelectAllChecked}
        setSearch={setSearch}
        setSelectedAlerts={setSelectedAlerts}
      />

      <Box
        width="100%"
        display="flex"
        alignItems="center"
        pr={2}
        pl={2}
        mb={2}
        mt={2}
        style={{ gap: theme.spacing(2) }}>
        <SearchField
          label={'Search Alerts'}
          variant="outlined"
          type="text"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />

        <StatusSelectField
          selectedStatus={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value)
          }}
        />
      </Box>

      {loading && <LoadingBar dataArray={alerts} />}
      <Divider />

      {error && (
        <Box margin={2}>
          <ErrorMessage errorStatus={error?.payload?.status} />
        </Box>
      )}

      {!error && (
        <PaginatedTable
          fetchData={fetchData}
          pageCount={counts}
          columns={columns}
          emptyListMessage={`No alerts were found matching your filters`}
          data={alerts || []}
        />
      )}
    </>
  )
}

const AlertToolBar = ({
  counts,
  refreshAlerts,
  alerts,
  selectAllChecked,
  selectedAlerts,
  selectedStatus,
  pageConf,
  setSelectAllChecked,
  setSearch,
  setSelectedAlerts
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const { hideForm } = useContext(AlertsTabContext)
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Box
      // disableGutters
      style={{
        // background: 'red',
        // height: 'fit-content',

        display: 'flex',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
      }}>
      <Box
        className={smallScreen ? classes.marginTop : ''}
        display="flex"
        style={{ gap: theme.spacing(2) }}
        alignItems={smallScreen ? '' : 'center'}
        flexDirection={smallScreen ? 'column' : 'row'}>
        {hideForm && (
          <Box>
            <CreateAlertsBtn />
          </Box>
        )}

        <Box>
          <BulkAlertsMenuBtn
            selectAllChecked={selectAllChecked}
            selectedAlerts={selectedAlerts}
            counts={counts}
          />
        </Box>
        <Box color={red[300]} id="bulk delete">
          <BulkDeleteAlertsBtn
            selectAllChecked={selectAllChecked}
            selectedStatus={selectedStatus}
            counts={counts}
            pageConf={pageConf}
            selectedAlerts={selectedAlerts}
            onSuccess={() => {
              setSelectAllChecked(false)
              setSearch(null)
              setSelectedAlerts(new Set())
            }}
          />
        </Box>
      </Box>

      <Box
        mt={1}
        style={{ marginLeft: 'auto', marginBottom: 'auto' }}
        display="flex"
        alignItems="center">
        {alerts && (
          <Typography variant="subtitle2" color="textSecondary">
            {counts} alerts
          </Typography>
        )}

        <Tooltip title="Refresh List">
          <IconButton
            onClick={() => {
              refreshAlerts()
            }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

const NotLoggedInAlertsUi = (params) => {
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()

  return (
    !isLoggedIn && (
      <Box
        display="flex"
        alignItems="center"
        borderTop={`1px solid ${grey[300]}`}
        p={3}>
        <Box fontSize={32} color={green[500]} mr={3}>
          <WhatsAppIcon fontSize="inherit" color="inherit" />
        </Box>
        <Box>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            Get started with alerts
          </Typography>
          <Typography>
            Login to connect your WhatsApp account and start creating alerts
          </Typography>
        </Box>
        <Box ml="auto">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              if (!isLoggedIn) {
                showAuthDialog()
              }
            }}>
            Login
          </Button>
        </Box>
      </Box>
    )
  )
}

export default AlertsTable
