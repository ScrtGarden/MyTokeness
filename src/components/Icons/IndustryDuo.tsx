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
        d="M148 320h-40a12 12 0 00-12 12v40a12 12 0 0012 12h40a12 12 0 0012-12v-40a12 12 0 00-12-12zm128 0h-40a12 12 0 00-12 12v40a12 12 0 0012 12h40a12 12 0 0012-12v-40a12 12 0 00-12-12zm128 0h-40a12 12 0 00-12 12v40a12 12 0 0012 12h40a12 12 0 0012-12v-40a12 12 0 00-12-12z"
        opacity={0.4}
      />
      <path
        d="M475.12 163.78L336 252.31V184a24 24 0 00-36.88-20.25L160 252.31V56a24 24 0 00-24-24H24A24 24 0 000 56v400a24 24 0 0024 24h464a24 24 0 0024-24V184a24 24 0 00-36.88-20.22zM160 372a12 12 0 01-12 12h-40a12 12 0 01-12-12v-40a12 12 0 0112-12h40a12 12 0 0112 12zm128 0a12 12 0 01-12 12h-40a12 12 0 01-12-12v-40a12 12 0 0112-12h40a12 12 0 0112 12zm128 0a12 12 0 01-12 12h-40a12 12 0 01-12-12v-40a12 12 0 0112-12h40a12 12 0 0112 12z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
