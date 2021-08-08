import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M576 208v-96a48 48 0 00-48-48H48a48 48 0 00-48 48v96a48 48 0 010 96v96a48 48 0 0048 48h480a48 48 0 0048-48v-96a48 48 0 010-96zM400 400a16 16 0 1116-16 16 16 0 01-16 16zm0-64a16 16 0 1116-16 16 16 0 01-16 16zm0-64a16 16 0 1116-16 16 16 0 01-16 16zm0-64a16 16 0 1116-16 16 16 0 01-16 16zm0-64a16 16 0 1116-16 16 16 0 01-16 16z"
        opacity={0.4}
      />
      <path
        d="M400 304a16 16 0 1016 16 16 16 0 00-16-16zm0 64a16 16 0 1016 16 16 16 0 00-16-16zm0-224a16 16 0 10-16-16 16 16 0 0016 16zm0 96a16 16 0 1016 16 16 16 0 00-16-16zm0-64a16 16 0 1016 16 16 16 0 00-16-16z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
