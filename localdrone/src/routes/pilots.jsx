import {
    Form,
    useLoaderData,
    useFetcher,
  } from "react-router-dom";
import React, { useState } from 'react';
import { getPilots } from "../pilots";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
  
export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}
  
export async function loader({ params }) {
  const pilots = await getPilots(params.contactId);
  if (!pilots) {
    throw new Response("", {
      status: 400,
      statusText: "encountered error while loading pilots",
    });
  }
  return { contact };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#282c34",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#282c34",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function createData(username, zipcode, missionsCompleted, lastLogin) {
    return { username, zipcode, missionsCompleted, lastLogin};
}
  
const rows = [
  createData('Jay', 98033, 32, '8/2/2023'),
  createData('Cheech', 98059, 30, '7/5/2022'),
];

const services = [
  {
    value: 'property',
    label: 'property',
  },
  {
    value: 'wedding',
    label: 'wedding',
  },
];

export default function Pilots() {       
  return (
    <div id="pilots">
      <div id="search">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="ZIP Code"
            name="zipcode"
            inputProps={{ 'data-lpignore': true, autocomplete: "off" }}
          />
          <TextField
            label="Proximity (miles)"
            name="zipcodeDistance"
            type="number"
            inputProps={{ 'data-lpignore': true, autocomplete: "off" }}
          />
          <TextField
            label="Services"
            name="services"
            select
          >
                        {services.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            label="Hardware"
            name="hardware"
          />
        </Box>
      </div>
      <div id="data">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="right">ZIP Code</StyledTableCell>
                <StyledTableCell align="right">Missions Completed</StyledTableCell>
                <StyledTableCell align="right">Last Login</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.username}>
                  <TableCell component="th" scope="row">
                      {row.username}
                  </TableCell>
                  <TableCell align="right">{row.zipcode}</TableCell>
                  <TableCell align="right">{row.missionsCompleted}</TableCell>
                  <TableCell align="right">{row.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}