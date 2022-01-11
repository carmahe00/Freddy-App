import React from 'react'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Grid, Avatar, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from '@material-ui/core'
import { Formik, useFormik } from 'formik';
import { makeStyles } from '@material-ui/styles'
import { login } from '../actions/userActions';

const validationSchema = yup.object({
    email: yup
        .string('Ingrese su usuario')
        .required('Email es obligatorio'),
    password: yup
        .string('Enter your password')
        .min(4, 'La contraseña es minima de 4 caracteres')
        .required('Password es obligatorio'),
});

const useStyles = makeStyles(theme => ({
    paperStyle: {
        padding: 20, height: '70vh', width: 280, margin: "20px auto"
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    btnStyle: {
        margin: '8px 0',
        background: 'red',
        backgroundColor: 'rgba(255, 255, 255, 0.27)',
        color: '#150f03',
        width: '100%',
        "&:hover":{
            backgroundColor: 'rgba(255, 255, 255, 0.47)'
        }
    },
}))

const LoginUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.userLogin)

    if (loading)
        return <CircularProgress style={{ width: '100px', height: '100px', margin: 'auto', display: 'block', marginTop: '50px' }} color="primary" />
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            
            <Grid item align="center">
                <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Usuarios</h2>
            </Grid>
            <Grid item align="center">
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        email: '',
                        password: ''
                    }}

                    onSubmit={({email, password}) => {
                        dispatch(login(email, password))
                    }}
                >
                    {
                        props => (
                            <form onSubmit={props.handleSubmit} >
                                <TextField
                                    fullWidth
                                    label='Email'
                                    placeholder='Ingrese su correo'
                                    name="email"
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    error={props.touched.email && Boolean(props.errors.email)}
                                    helperText={props.touched.email && props.errors.email}
                                />
                                <TextField
                                    fullWidth
                                    label='Password'
                                    type="password"
                                    placeholder='Ingrese su correo'
                                    name="password"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    error={props.touched.password && Boolean(props.errors.password)}
                                    helperText={props.touched.password && props.errors.password}
                                />
                                <Button type='submit' color='primary' variant="contained" className={classes.btnStyle} >Iniciar Sesión</Button>
                            </form>
                        )
                    }
                </Formik>
            </Grid>
        </Grid>

    )
}

export default LoginUser
