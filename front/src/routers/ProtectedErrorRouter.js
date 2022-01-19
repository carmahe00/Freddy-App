import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { ROLES } from '../utils/role.types';

const ProtectedErrorRouter = ({isAuthenticated}) => {
    const params = useParams();
    const location = useLocation();
    
    
    return isAuthenticated ? (
    params.type === ROLES.user ? <><Navigate to="/guess/home" /></>:
    <><Navigate to="/user/home" /></>) : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedErrorRouter
