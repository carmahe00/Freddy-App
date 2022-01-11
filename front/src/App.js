import React from 'react'
import { useSelector } from 'react-redux';
import { CircularProgress, makeStyles, ThemeProvider } from '@material-ui/core';
import './App.css';
import theme from './components/ui/theme'
import AppRouter from './routers/AppRouter';

const useStyles = makeStyles((theme) => ({
  root: {
    
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const App = () => {
  const classes = useStyles();
  const { loading } = useSelector(state => state.userLogin)

  if (loading)
    return (
      <div className={classes.root}>
        <CircularProgress style={{width: '100px', height: '100px' , margin:'auto',display:'block', marginTop: '50px'}} color="primary" />
      </div>
    )

  return (
    <ThemeProvider theme={theme} >
      <AppRouter />
    </ThemeProvider>
  )
}


export default App;
