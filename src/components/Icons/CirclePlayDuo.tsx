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
        d="M256 16C123.451 16 16 123.451 16 256s107.451 240 240 240 240-107.451 240-240S388.549 16 256 16zm116.516 260.48l-144 88A23.988 23.988 0 01216 368.004c-13.693 0-24-11.197-24-24v-176c0-12.69 10.197-23.992 24.006-23.992 4.344 0 8.678 1.176 12.51 3.515l144 88c7.132 4.36 11.484 12.118 11.484 20.477a24 24 0 01-11.484 20.476z"
        opacity={0.4}
      />
      <path
        d="M216 368.004c-13.692 0-24-11.196-24-24v-176c0-12.69 10.198-23.991 24.006-23.991a23.99 23.99 0 0112.51 3.515l144 88A24 24 0 01384 256.004a24.003 24.003 0 01-11.484 20.477l-144 88A23.987 23.987 0 01216 368.004z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
