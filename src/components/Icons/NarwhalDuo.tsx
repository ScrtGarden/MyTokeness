import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M464 160a303.006 303.006 0 00-197.074 72.844l-112.52 96.344C144.025 338.074 128 330.699 128 317.033v-34.918l49.75-30.498c8.873-5.875 14.25-15.873 14.25-26.623v-81.002c0-12.748-14.205-20.355-24.816-13.287l-71.166 47.402h-.034l-71.107-47.365C14.24 123.658 0 131.283 0 144.062v80.93c.002 10.752 5.375 20.75 14.252 26.625L64 282.117V352c0 88.365 71.635 160 160 160h240c97.201 0 176-78.799 176-176s-78.799-176-176-176zm40 160c-13.254 0-24-10.746-24-24 0-13.256 10.746-24 24-24s24 10.744 24 24c0 13.254-10.746 24-24 24z"
        opacity={0.4}
      />
      <path
        d="M504 272c-13.254 0-24 10.744-24 24 0 13.254 10.746 24 24 24s24-10.746 24-24c0-13.256-10.746-24-24-24zM622.609 0a17.437 17.437 0 00-14.814 8.148l-99.311 157.745-.015-.004a175.623 175.623 0 0182.244 48.148l-.002-.002 48.746-192.312C642.244 10.727 633.955.037 622.609 0z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent