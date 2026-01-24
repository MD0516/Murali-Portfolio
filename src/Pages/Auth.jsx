import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import Login from '../Components/Utils/Login'

const Auth = () => {
    const [searchParams] = useSearchParams()
    const type = searchParams.get("type")

    return type === 'admin' ? <Login /> : <Navigate to="/" />
}

export default Auth