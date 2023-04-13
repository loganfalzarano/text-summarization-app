import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Grid } from '@mui/material';
import { FormControl } from '@mui/material';
import { TextField } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
        <TextField id="filled-basic" label="Filled" variant="filled" />
        </Grid>
        <Grid xs={6} md={4}>
          <p>1</p>
        </Grid>
        <Grid xs={6} md={4}>
          <p>1</p>
        </Grid>
        <Grid xs={6} md={8}>
          <p>1</p>
        </Grid>
      </Grid>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
