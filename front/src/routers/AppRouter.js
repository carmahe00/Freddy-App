import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Route,
    Routes
} from "react-router-dom";

import { LoginPage } from '../pages/LoginPages';
import { Home } from '../pages/Home'
import ProtectedRouter from './ProtectedRouter';
import PublicRoute from './PublicRoute';
import { ROLES } from '../utils/role.types';
import ProtectedErrorRouter from './ProtectedErrorRouter';

const AppRouter = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin)

    return (
        <Routes>
            <Route element={<PublicRoute isAuthenticated={!!userInfo} />}>
                <Route path="/" element={<LoginPage />} />

            </Route>
            <Route path="user" element={<ProtectedRouter isAuthenticated={!!userInfo} roles={[ROLES.user]} />} >

                <Route path="home" element={<Home />} />
                <Route path="predios" element={<Home />} />
                <Route path="vehiculos" element={<Home />} />
                <Route path="pagos" element={<Home />} />

            </Route>
            <Route path="guess" element={<ProtectedRouter isAuthenticated={!!userInfo} roles={[ROLES.third]} />} >

                <Route path="home" element={<>Inivitados</>} />
                <Route path="presupuesto" element={<>presupuesto</>} />
                <Route path="predial" element={<>predial</>} />
                <Route path="iyc" element={<>iyc</>} />
                <Route path="nomina" element={<>nomina</>} />
                <Route path="transito" element={<>transito</>} />

            </Route>
            <Route path="error/:type" element={<ProtectedErrorRouter isAuthenticated={!!userInfo} />}  />

        </Routes>

    )
}

export default AppRouter
