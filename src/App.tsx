// base and 3rd party
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';

// styling
import './assets/styles/App.css';

// components
import { Questionnaire } from './components/Questionnaire';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  '& .MuiGrid-container': {
    alignItems: 'center',
  },
  '& .full-answer': {
    display: 'flex',
    justifyContent: 'center',
  },
}));

//most prolly from api, so lets make it a object array mock
const questionListData = [
  {
    id: 4,
    label: 'When?',
    question: 'When?',
    position: 9,
  },
  {
    id: 2,
    label: 'What?',
    question: 'What?',
    position: 2,
  },
  {
    id: 3,
    label: 'Where?',
    question: 'Where?',
    position: 4,
  },
  {
    id: 1,
    label: 'Who?',
    question: 'Who?',
    position: 1,
  },
]


const App = () => {
  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Questionnaire questionData={questionListData} />
            </Item>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
      </Box>
    </div>
  );
}

export default App;
