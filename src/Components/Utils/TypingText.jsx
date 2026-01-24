import React from 'react'
import { useState, useEffect } from 'react'

const TypingText = ({text, speed}) => {

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect( () => {
    if ( index < text.length ) {
      const timer = setTimeout(() =>{
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex(index + 1); 
      }, speed)

      return () => clearTimeout(timer);

    }
  }, [index, text, speed]);

  return (
    <>
      <p className='auto-type'>
        {displayText}
      </p>
    </>
  )
}

export default TypingText