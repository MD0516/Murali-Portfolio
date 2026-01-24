import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { checkSession } from '../Store/authSlice'

const ProtectRoute = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSession())
    }, [dispatch])

    if (loading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} replace />
    }

    return <Outlet />
}

export default ProtectRoute