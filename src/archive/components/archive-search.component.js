import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';

export function ArchiveSearchComponent() {
    return (
      <Paper
        component="form"
        sx={{display: 'flex', alignItems: 'center', width: '100%'}}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Archives"  // Updated placeholder
          inputProps={{ 'aria-label': 'search archives' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <TuneIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    );
  }

  export default ArchiveSearchComponent