import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M576 150.406V208c0 8.836-7.164 16-16 16h-32c-8.836 0-16-7.164-16-16v-59.281c0-41.836-30.012-80.039-71.629-84.289C392.523 59.539 352 97.113 352 144v80h-64v-80C288 59.852 360.541-7.664 446.377.703 521.188 7.992 576 75.242 576 150.406z"
        opacity={0.4}
      />
      <path
        d="M64 224c-35.346 0-64 28.652-64 64v160c0 35.344 28.654 64 64 64h320c35.346 0 64-28.656 64-64V288c0-35.348-28.654-64-64-64H64zm192 160c0 17.672-14.326 32-32 32s-32-14.328-32-32v-32c0-17.672 14.326-32 32-32s32 14.328 32 32v32z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
