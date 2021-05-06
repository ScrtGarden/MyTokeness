import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path d="M640 239.87v31.26A15.88 15.88 0 01624.14 287H15.87A15.88 15.88 0 010 271.13v-31.26A15.88 15.88 0 0115.87 224h608.27A15.88 15.88 0 01640 239.87z" />
    </svg>
  )
}

export default SvgComponent
