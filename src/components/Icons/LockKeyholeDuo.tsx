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
        d="M416 144v80h-64v-80c0-44.125-35.891-80-80-80s-80 35.875-80 80v80h-64v-80C128 64.594 192.594 0 272 0s144 64.594 144 144z"
        opacity={0.4}
      />
      <path
        d="M48 288v160c0 35.344 28.654 64 64 64h320c35.346 0 64-28.656 64-64V288c0-35.348-28.654-64-64-64H112c-35.346 0-64 28.652-64 64zm192 64c0-17.672 14.326-32 32-32s32 14.328 32 32v32c0 17.672-14.326 32-32 32s-32-14.328-32-32v-32z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
