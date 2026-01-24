import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const LoadingBarWrapper = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      ref.current?.complete();
    })

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <LoadingBar color='#7c7b7b' ref={ref} height={2} background='transparent' shadow={false} />
  )
}

export default LoadingBarWrapper