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
        d="M256 32C112.906 32 4.562 151.125 0 288v104c0 13.255 10.745 24 24 24s24-10.745 24-24V288c0-114.672 93.344-207.797 208-207.812 114.656.015 208 93.14 208 207.812v104c0 13.255 10.745 24 24 24s24-10.745 24-24V288C507.438 151.125 399.094 32 256 32z"
        opacity={0.4}
      />
      <path
        d="M160 288h-16c-35.344 0-64 28.703-64 64.125v63.75C80 451.297 108.656 480 144 480h16c17.656 0 32-14.359 32-32.062V320.062C192 302.344 177.656 288 160 288zm208 0h-16c-17.656 0-32 14.344-32 32.062v127.876C320 465.641 334.344 480 352 480h16c35.344 0 64-28.703 64-64.125v-63.75C432 316.703 403.344 288 368 288z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
