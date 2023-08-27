import {
    Form,
    useLoaderData,
    useFetcher,
  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
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

import { getPilots } from "../users";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export async function loader() {
  const users = await getPilots();
  return { users };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#595959',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#595959',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const checkboxData = [
  { id: '1', label: 'Aerial Photography and Videography', checked: false },
  { id: '2', label: 'Surveying and Mapping', checked: true },
  { id: '3', label: 'Search and Rescue', checked: false },
  { id: '4', label: 'Precision Agriculture', checked: false },
  { id: '5', label: 'Infrastructure Inspection', checked: false },
  { id: '6', label: 'Environmental Monitoring', checked: false },
];

export default function Pilots() {
  const [tableData, setTableData] = useState([]);
  const [zipcode, setZipcode] = useState([]);
  const [proximity, setProximity] = useState([]);

  const [checkboxes, setCheckboxes] = useState(checkboxData);
  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };
  
  const fetchData = async () => {
    let data = await getPilots();
    setTableData(data);
  }
  
  useEffect(() => {
    // Initial data fetch when the component mounts
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Call fetchData to refresh the data
    fetchData();
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleProximityChange = (event) => {
    setProximity(event.target.value);
  };

  const handleFilters = (event) => {
    console.log('zipcode: ' + zipcode);
    console.log('proximity: ' + proximity);
  };

  const handleClearFilters = (event) => {
    setZipcode('');
    setProximity('');
  };

  const handleCheckBox = (event) => {
    setServices
    console.log(event.target);
    console.log(event.target.id);
  };

  const stackStyle = {
    height: '100%',
    // Add any other desired styles here
  };

  return (
    <div id="pilots">
      <Stack spacing={2} style={stackStyle}>
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
                  value={zipcode}
                  onChange={handleZipcodeChange}
                  sx={{
                    paddingRight: 2,
                  }}
                  inputProps={{ 'data-lpignore': true }}
                />
                <TextField
                  label="Proximity (miles)"
                  name="zipcodeDistance"
                  value={proximity}
                  onChange={handleProximityChange}
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
                {checkboxes.map((checkbox) => (
                  <FormControlLabel key={checkbox.id} control={<Checkbox id={checkbox.id}/>} label={checkbox.label} />
                ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Stack direction="row" spacing={2}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" startIcon={<FilterAltIcon />} onClick={handleFilters}>
              Apply Filters
            </Button>  
            <Button variant="contained" startIcon={<FilterAltOffIcon />} onClick={handleClearFilters}>
              Reset Filters
            </Button>  
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleRefresh}>
                Refresh
              </Button>  
            </div>   
          </ThemeProvider>
        </Stack>  
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
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