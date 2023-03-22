import ErrorMessage from '@/components/ErrorMessage'
import ListFilters from '@/components/ListFilters'
import ListPagination from '@/components/ListPagination'
import ZenApi from '@/services/trader'
import { Box, CircularProgress, Divider, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'
import HistoricalTradeList from './HistoricalTradeList'

const HistoricalTrades = () => {
  const [historicalTrades, setHistoricalTrades] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)
  const [pageConf, setPageConf] = useState({})
  const [filters, setFilters] = useState()
  const [count, setCount] = useState(0)

  useEffect(() => {
    getHistoricalTrades()
  }, [pageConf, filters])

  const getHistoricalTrades = async () => {
    try {
      const res = await ZenApi.Broker.trade.get({
        expand: 'orders',
        status: 'Closed',
        limit: pageConf.limit,
        offset: pageConf.offSet,
        ...filters
      })
      setHistoricalTrades(res.data.results)
      setCount(res.data.count)
    } catch (e) {
      setIsError(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onPaginationChange = (offSet, limit) => {
    setPageConf({
      limit: limit,
      offSet: offSet
    })
  }
  if (isLoading) {
    return (
      <Box display={'flex'} alignItems="center" justifyContent={'center'} m={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <>
      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems={'center'}>
        <Typography
          variant="h6"
          style={{ marginTop: 16, marginBottom: 8, marginLeft: 16 }}>
          Historical Trades
        </Typography>
        <ListPagination onChange={onPaginationChange} count={count} />
      </Box>

      <Divider
        style={{
          color: grey[100]
        }}
      />
      <ListFilters
        filters={filters}
        setFilters={setFilters}
        // renderFilters={(updateFilter) => (
        //   <Box m={2}>
        //     <Grid container spacing={2}>
        //       <Grid item xs={6}>
        //         <FormControl fullWidth variant="outlined" size="small">
        //           <InputLabel id="lbl-filter-sort" shrink>
        //             {'label'}
        //           </InputLabel>
        //           <Select
        //             label={'label'}
        //             value={filters?.status || ''}
        //             onChange={(v) => {
        //               updateFilter('status', v.target.value)
        //             }}
        //             labelId="lbl-filter-sort"
        //             displayEmpty
        //             notched>
        //             <MenuItem value="">None</MenuItem>
        //             {[
        //               { label: 'Active', value: 'active' },
        //               { label: 'InActive', value: 'inActive' }
        //             ].map((item) => {
        //               return (
        //                 <MenuItem key={item.value} value={item.value}>
        //                   {item.label}
        //                 </MenuItem>
        //               )
        //             })}
        //           </Select>
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={6}>
        //         <FormControl fullWidth variant="outlined" size="small">
        //           <InputLabel id="lbl-filter-sort" shrink>
        //             {'label'}
        //           </InputLabel>
        //           <Select
        //             label={'label'}
        //             value={filters?.OPP || ''}
        //             onChange={(v) => {
        //               updateFilter('OPP', v.target.value)
        //             }}
        //             labelId="lbl-filter-sort"
        //             displayEmpty
        //             notched>
        //             <MenuItem value="">None</MenuItem>
        //             {[
        //               { label: 'Active', value: 'active' },
        //               { label: 'InActive', value: 'inActive' }
        //             ].map((item) => {
        //               return (
        //                 <MenuItem key={item.value} value={item.value}>
        //                   {item.label}
        //                 </MenuItem>
        //               )
        //             })}
        //           </Select>
        //         </FormControl>
        //       </Grid>
        //     </Grid>
        //   </Box>
        // )}
      />
      <HistoricalTradeList historicalTrades={historicalTrades} />
    </>
  )
}

export default HistoricalTrades
