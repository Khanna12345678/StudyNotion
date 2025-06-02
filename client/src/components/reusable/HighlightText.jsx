import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold text-transparent bg-gradient-to-b from-[#12d8f9] to-[#64ede0] bg-clip-text'>
        {" "}{text}
    </span>
  )
}

export default HighlightText