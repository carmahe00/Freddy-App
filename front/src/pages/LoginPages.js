import React, { useState } from 'react'
import * as yup from 'yup';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { Grid, Paper, CircularProgress, Tab, Tabs, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab';

import LoginUser from '../components/LoginUser';
import LoginGuess from '../components/LoginGuess'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Ingrese un correo valido')
        .required('Email es obligatorio'),
    password: yup
        .string('Enter your password')
        .min(4, 'La contraseña es minima de 4 caracteres')
        .required('Password es obligatorio'),
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundImage: `url('http://upir.ir/images/njwjgzdr26ob4m0kulkl.svg')`,
        height:  '100vh',
        border: '0px',
        margin: '0px',
        padding: '0px',
        display: 'grid',
        overflow: 'hidden'  ,
        backgroundRepeat: 'repeat',
        transition: 'background-position 1s'
    },
    paperStyle: {
        padding: '20px', height: '70vh', maxWidth: '500px', margin: "0px auto ",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)',
        [theme.breakpoints.down("xs")]:{
            maxWidth: '300px'
        }
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    btnStyle: {
        margin: '8px 0'
    },
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'} variant={'body2'} >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export const LoginPage = () => {

    const classes = useStyles();
    const [value, setValue] = useState(0)
    const { loading, error } = useSelector(state => state.userLogin)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    if (loading)
        return <CircularProgress style={{ width: '100px', height: '100px', margin: 'auto', display: 'block', marginTop: '50px' }} color="primary" />


    return (
        <div className={classes.root} >
            { error && <Alert severity="error" > {error} </Alert>}
            <Grid container item className={classes.color} alignContent="center" >
                <Paper elevation={10} className={classes.paperStyle}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Usuarios" {...a11yProps(0)} />
                            <Tab label="DOCENTES" {...a11yProps(1)} />
                        </Tabs>
                    
                    <TabPanel value={value} index={0}>
                        <LoginUser />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <LoginGuess />
                    </TabPanel>
                </Paper>
            </Grid>
        </div>

    )
}
