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
        d="M256 8C119 8 8 119.08 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a32 32 0 1132-32 32 32 0 01-32 32zm38.24-238.41l-12.8 128A16 16 0 01265.52 288h-19a16 16 0 01-15.92-14.41l-12.8-128A16 16 0 01233.68 128h44.64a16 16 0 0115.92 17.59z"
        opacity={0.4}
      />
      <path
        d="M278.32 128h-44.64a16 16 0 00-15.92 17.59l12.8 128A16 16 0 00246.48 288h19a16 16 0 0015.92-14.41l12.8-128A16 16 0 00278.32 128zM256 320a32 32 0 1032 32 32 32 0 00-32-32z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
