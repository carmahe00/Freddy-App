import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import mountains from '../../assets/mountains.svg'
import world from '../../assets/world.svg'

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundImage: `url(${mountains})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        maxHeight: "3em",
        width: "100%",
        bottom: 0
    },
    icon: {
        height: "4em",
        width: "4em",
    },
    mainContainer: {
        position: "absolute", 
        marginTop: "1px",
        right: "1.4em",
        
    }
    
}))

export const Footer = () => {
    const classes = useStyles()
    return (
        <footer style={{ height: "5em" }} className={classes.footer} >
            <Grid container justifyContent="flex-end" spacing={2} className={classes.mainContainer} >
                <Grid item  >
                    <Grid item component={"a"} href="https://flexi.com.co/" rel="noopener noreferrer" target="_blank" >
                        <img alt="flexi" src={world} className={classes.icon} />
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}
