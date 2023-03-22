import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button , Link, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  table_body: {
    padding: '13px',
  },
  check_icon: {
    fontSize: '12px',
  }
});

function createData(name, prime, pro) {
  return { name, prime, pro };
}

const rows = [
  createData('Stock Options Buying Strategy', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small"  color="primary" />),
  createData('Stock Selection Strategy', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Gap Up & Gap Down Rule', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Risk Management Plan  ', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Psycho Cybernetics System  ', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Banknifty Expiry Special Strategy', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Banknifty Options Selling Monthly Expiry  ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Banknifty Options Selling Weekly Expiry  ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Nifty Options Selling Monthly Expiry  ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Nifty Options Selling Weekly Expiry  ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Banknifty Future Strategy  ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Nifty Future Strategy ', <RemoveIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('Study Material & Resources  ', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
  createData('FAB Box  ', <CheckCircleIcon fontSize="small" color="primary" />, <CheckCircleIcon fontSize="small" color="primary" />),
];

export default function OmPlan() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Features</TableCell>
            <TableCell align="center">
              Prime Trader
              <Typography variant='h6' color='primary'>₹24,800/-</Typography>
              </TableCell>
            <TableCell align="center">
              Pro Trader
              <Typography variant='h6' color='primary'>₹48,200/-</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className={classes.table_body}>

              <Typography variant="body1">
              {row.name}
                </Typography>
                
              </TableCell>
              <TableCell align="center" className={classes.table_body}>{row.prime}</TableCell>
              <TableCell align="center" className={classes.table_body}>{row.pro}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row" className={classes.table_body}>
                
            </TableCell>
            <TableCell component="th" scope="row" className={classes.table_body}>
              <Box display={'flex'} justifyContent={'center'}>
              <Link href="https://pages.razorpay.com/pl_JMmFT5fZkAjKf1/view" underline="none">
              <Button variant="contained" color="primary">Register For Prime</Button>
              </Link>
              </Box>
            </TableCell>
            <TableCell component="th" scope="row" className={classes.table_body}>
            <Box display={'flex'} justifyContent={'center'}>
             <Link href="https://pages.razorpay.com/pl_JMmIagzzwWu5wr/view" underline="none">
              <Button variant="contained" color="primary">Register For Pro</Button>
              </Link>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
