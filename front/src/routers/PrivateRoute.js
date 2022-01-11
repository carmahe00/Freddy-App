import React, { useState } from 'react'
import { Navigate, Route } from 'react-router-dom'

import { Header } from '../components/ui/Header'
import { Footer } from '../components/ui/Footer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        minHeight: '100%',
        marginBottom: '10vh',
        marginTop: '10vh'
    }
}))

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedIndexUser, setSelectedIndexUser] = useState(0)
    return (
        <>
            <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedIndexUser={selectedIndexUser} setSelectedIndexUser={setSelectedIndexUser} />
            <div className={classes.container} >
                <Route {...rest} element={props => (
                    isAuthenticated
                        ? <Component {...props} />
                        : <Navigate to="/" replace />
                )} />
            </div>
            <Footer />
        </>
    )
}

export default PrivateRoute
