import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'

export const HomeRoute = () => {
    return (
        <Routes>
            <Route exact path="/home" component={Home}  />
        </Routes>
    )
}
