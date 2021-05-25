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
        d="M480 416H32a32 32 0 01-32-32v-32a96 96 0 0196-96h66.56A29.44 29.44 0 00192 226.56v-.07c0-31.79-10-62.06-23.31-90.91A93.86 93.86 0 01160 96 96.06 96.06 0 01273.25 1.5C312 8.25 343.74 40.17 350.51 79a94.83 94.83 0 01-9.05 60.42c-12.58 24.26-21.46 50.3-21.46 77.67v9.46A29.44 29.44 0 00349.43 256H416a96 96 0 0196 96v32a32 32 0 01-32 32z"
        opacity={0.4}
      />
      <path d="M480 416v96H32v-96z" className="prefix__fa-primary" />
    </svg>
  )
}

export default SvgComponent
