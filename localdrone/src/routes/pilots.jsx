import {
    Form,
    useLoaderData,
    useFetcher,
  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});
  
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

const services = [
  {
    value: 'property',
    label: 'property',
  },
  {
    value: 'wedding',
    label: 'wedding',
  },
  {
    value: 'ALL',
    label: 'ALL',
  },
];

export default function Pilots() {     
  const [tableData, setTableData] = useState([]);
  const apiUrl = '/api/get-users';
  const fetchUsers = async () => {
    const response = await fetch(apiUrl);
    const json = await response.json();
    console.log(json);
    setTableData(json);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="pilots">
      <Stack spacing={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Proximity</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="ZIP Code"
                  name="zipcode"
                  sx={{
                    paddingRight: 2,
                  }}
                  inputProps={{ 'data-lpignore': true }}
                />
                <TextField
                  label="Proximity (miles)"
                  name="zipcodeDistance"
                  type="number"
                  sx={{
                    paddingRight: 2,
                  }}
                  inputProps={{ 'data-lpignore': true }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Services</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Aerial Photography and Videography" />
                  <FormControlLabel control={<Checkbox />} label="Surveying and Mapping" />
                  <FormControlLabel control={<Checkbox />} label="Search and Rescue" />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Precision Agriculture" />
                  <FormControlLabel control={<Checkbox />} label="Infrastructure Inspection" />
                  <FormControlLabel control={<Checkbox />} label="Environmental Monitoring" />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Stack direction="row" spacing={2}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={fetchUsers}>
              Refresh
            </Button>     
          </ThemeProvider>
        </Stack>     
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
              {tableData.map((row) => (
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
      </Stack>
    </div>
  )
}