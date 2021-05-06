import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M358.4 3.23L320 48 265.6 3.23a15.9 15.9 0 00-19.2 0L192 48 137.6 3.23a15.9 15.9 0 00-19.2 0L64 48 25.6 3.23A16 16 0 000 16v480a16 16 0 0025.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0019.2 0L192 464l54.4 44.8a15.9 15.9 0 0019.2 0L320 464l38.4 44.8A16 16 0 00384 496V16a16 16 0 00-25.6-12.77zM320 360a8 8 0 01-8 8H72a8 8 0 01-8-8v-16a8 8 0 018-8h240a8 8 0 018 8zm0-96a8 8 0 01-8 8H72a8 8 0 01-8-8v-16a8 8 0 018-8h240a8 8 0 018 8zm0-96a8 8 0 01-8 8H72a8 8 0 01-8-8v-16a8 8 0 018-8h240a8 8 0 018 8z"
        opacity={0.4}
      />
      <path
        d="M312 144H72a8 8 0 00-8 8v16a8 8 0 008 8h240a8 8 0 008-8v-16a8 8 0 00-8-8zm0 96H72a8 8 0 00-8 8v16a8 8 0 008 8h240a8 8 0 008-8v-16a8 8 0 00-8-8zm0 96H72a8 8 0 00-8 8v16a8 8 0 008 8h240a8 8 0 008-8v-16a8 8 0 00-8-8z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
