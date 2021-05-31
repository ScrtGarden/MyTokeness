import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M400 320h32a16 16 0 0116 16v128a48 48 0 01-48 48H48a48 48 0 01-48-48V112a48 48 0 0148-48h160a16 16 0 0116 16v32a16 16 0 01-16 16H64v320h320V336a16 16 0 0116-16z"
        opacity={0.4}
      />
      <path
        d="M512 24v128c0 21.47-26 32-41 17l-35.71-35.71L191.8 376.77a24 24 0 01-33.94 0l-22.63-22.63a24 24 0 010-33.94L378.76 76.68 343.05 41C328 25.9 338.66 0 360 0h128a24 24 0 0124 24z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
