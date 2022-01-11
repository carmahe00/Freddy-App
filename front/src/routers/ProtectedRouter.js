import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Header } from '../components/ui/Header';

const ProtectedRouter = ({ isAuthenticated, roles }) => {
    const location = useLocation();
    const [value, setValue] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { userInfo } = useSelector(state => state.userLogin)
    const [selectedIndexUser, setSelectedIndexUser] = useState(0)
    const rolesUser = userInfo?.soul_terceros || userInfo?.soul_usuario;
    
    
    const userHasRequiredRole = userInfo && roles.includes(rolesUser.role)
    
    
    return isAuthenticated ? (
        userHasRequiredRole && isAuthenticated ?
        <>
            <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedIndexUser={selectedIndexUser} setSelectedIndexUser={setSelectedIndexUser} />
            <Outlet />
        </>: <Navigate to={`/error/${roles[0]}`} state={{ from: location }} />) : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRouter
