import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children,active,linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center px-6 py-3 rounded-md font-semibold ${active?"bg-yellow-50 text-black drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]":"bg-richblack-800 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton