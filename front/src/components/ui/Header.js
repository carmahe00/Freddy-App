import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, List, Toolbar, AppBar, useMediaQuery, useScrollTrigger, Button, SwipeableDrawer } from '@material-ui/core'
import { ListItemText, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';

import { logout } from '../../actions/userActions';
import logo from '../../assets/flexi-header.svg'
import { ROLES } from '../../utils/role.types';

function ElevationScroll(props) {
  const { children, window } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.25em",
    }
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  },
  logoContainer: {
    padding: 0,
    marginRight: 'auto',
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  logo: {
    height: "6.5em",
    [theme.breakpoints.down("md")]: {
      height: "5.5em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "4.5em"
    }
  },
  navlinks: {
    marginLeft: 'auto',

  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(5),
    },
    "&:hover": {
      color: theme.palette.secondary.light,
      borderBottom: "1px solid #FFBA60",
    }
  },
  linkLogout: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: theme.palette.secondary.light,
      borderBottom: "1px solid #FFBA60",
    },
    marginLeft: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
    }
  },
  button: {
    marginRight: "25px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "40px",
    width: "40px"
  },
  drawerItemSelected: {
    opacity: 1
  }
}))

export function Header() {
  const theme = useTheme();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false)
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  let activeStyle = {
    textDecoration: "underline",
    color: theme.palette.secondary.light
  };
  const routesCiudadanos = useMemo(() => [
    { name: "Home", link: "/user/home" },
    { name: "Predios", link: "/user/predios" },
    { name: "Vehiculos", link: "/user/vehiculos" },
    { name: "Pagos", link: "/user/pagos" },
  ], [])
  const routesFuncionarios = useMemo(() => [
    { name: "Home", link: "/guess/home" },
    { name: "Presupuesto", link: "/guess/presupuesto" },
    { name: "Predial", link: "/guess/predial" },
    { name: "IyC", link: "/guess/iyc" },
    { name: "Nomina", link: "/guess/nomina" },
    { name: "Transito", link: "/guess/transito" },
  ], [])
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const { userInfo:{soul_usuario, soul_terceros} } = useSelector(state => state.userLogin)
  const [routes, setRoutes] = useState(routesCiudadanos)
  
  useEffect(() => {
    
    const role = soul_terceros?.role || soul_usuario?.role
    role === ROLES.user ? setRoutes(routesCiudadanos) : setRoutes(routesFuncionarios)
  }, [routesCiudadanos, routesFuncionarios, soul_usuario, soul_terceros])

  const home = () => {
    console.log("Home")
  }


  const handleLogout = () => {

    dispatch(logout())
    navigate("/")

  }

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {
            routes.map((route, index) => (
              <ListItem
                key={`${route.name}${index}`}
                divider={index === 0}
                button
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => setOpenDrawer(false)}
              >
                <NavLink to={route.link} className={classes.link}
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  {route.name}
                </NavLink>
              </ListItem>
            ))
          }
          <ListItem
            onClick={handleLogout}
            divider
            button
            classes={{ selected: classes.drawerItemSelected }}
          >
            <ListItemText classes={{ root: classes.link }} disableTypography  >Salir</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer} >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )

  const tabs = (
    <div className={classes.navlinks}>

      {
        routes.map((route, index) => (
          <NavLink to={route.link} key={`${route.name}${index}`} className={classes.link}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {route.name}
          </NavLink>
        ))
      }

      <IconButton onClick={handleLogout} aria-label="logout" className={classes.linkLogout} >
        <ExitToAppIcon />
      </IconButton>
    </div>
  )

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar} position="fixed" >
          <Toolbar disableGutters >
            <Button onClick={home} className={classes.logoContainer} disableRipple >
              <img alt="Flexi" src={logo} className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
