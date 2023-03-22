import {
  Box,
  FormControl,
  InputLabel,
  lighten,
  makeStyles,
  MenuItem,
  Select,
  Toolbar
} from '@material-ui/core'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
// import TablePaginationActions from "./TablePaginationActions";
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import clsx from 'clsx'
import React from 'react'
// import TableToolbar from "./TableToolbar";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  },
  filterContainer: {
    flexGrow: 1
  }
}))

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])

//     return (
//       <>
//         <Checkbox ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )

const EnhancedTable = ({
  columns,
  data,
  actions,
  initialState,
  setData,
  updateMyData,
  skipPageReset,
  onRowClick
}) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow
    // allColumns,
    // page,
    // gotoPage,
    // setPageSize,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    // state: { selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState,
      autoResetSortBy: false
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  )

  // const removeByIndexs = (array, indexs) =>
  //   array.filter((_, i) => !indexs.includes(i));

  // const deleteUserHandler = (event) => {
  //   const newData = removeByIndexs(
  //     data,
  //     Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
  //   );
  //   setData(newData);
  // };

  return (
    <TableContainer>
      {/* <TableToolbar
				numSelected={Object.keys(selectedRowIds).length}
				preGlobalFilteredRows={preGlobalFilteredRows}
				setGlobalFilter={setGlobalFilter}
				globalFilter={globalFilter}
				allColumns={allColumns}
				actions={actions}
			/> */}
      {/* {actions} */}
      {/* <Toolbar className={classes.}></Toolbar> */}

      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell
                  key={i}
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}>
                  {column.render('Header')}
                  {column.id !== 'selection' && !column.disableSortBy ? (
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow
                key={i}
                onClick={
                  onRowClick
                    ? () => {
                        onRowClick(row.original)
                      }
                    : null
                }
                hover={Boolean(onRowClick)}
                style={{
                  cursor: onRowClick ? 'pointer' : 'default'
                }}
                {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <TableCell key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>

        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: data.length },
              ]}
              colSpan={3}
              count={data.length}
              // rowsPerPage={pageSize}
              // page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
      </MaUTable>
    </TableContainer>
  )
}

const TableToolbar = (props) => {
  const classes = useToolbarStyles()
  const {
    // numSelected,
    // addUserHandler,
    // deleteUserHandler,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    // globalFilter,
    allColumns,
    actions
  } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        // [classes.highlight]: numSelected > 0,
      })}>
      <Box className={classes.filterContainer}>
        {allColumns?.map((column, i) =>
          column.canFilter ? column.render('Filter') : null
        )}
      </Box>
      <Box>{actions}</Box>
    </Toolbar>
  )
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, Header, ...colProps }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows

  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // React.useEffect(() => {
  //   setFilter(options[0]);
  // }, []);

  // Render a multi-select box
  return (
    <FormControl
      variant="outlined"
      size="small"
      style={{ marginRight: 16 }}
      // className={classes.tableSelect}
    >
      <InputLabel id="demo-simple-select-label">{Header}</InputLabel>
      <Select
        value={filterValue || options[0]}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
        label={Header}>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EnhancedTable
export { SelectColumnFilter, TableToolbar }
