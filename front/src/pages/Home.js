import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';

import deliveryLogo from '../assets/food-delivery.svg'
import administartorLogo from '../assets/web-administrator.svg'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,

    },
    cardContainer: {
        maxWidth: 345,
    },
    media: {
        height: "100%",
        paddingTop: '56.25%', // 16:9
        width: "100%"
    },
}));

export const Home = ({ history }) => {
    const classes = useStyles();
    const hadnleRedirect = (route)=>{
        history.push(route)
    }
    return (
        <div>
            <Grid container className={classes.root} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }} >
                <Grid item xs={12}>
                    <Grid container direction="row" justifyContent="center" spacing={2} alignItems="center" >
                        <h1>Home</h1>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
