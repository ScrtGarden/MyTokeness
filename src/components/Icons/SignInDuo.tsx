import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M512 160v192a96 96 0 01-96 96h-84a12 12 0 01-12-12v-40a12 12 0 0112-12h84a32 32 0 0032-32V160a32 32 0 00-32-32h-84a12 12 0 01-12-12V76a12 12 0 0112-12h84a96 96 0 0196 96z"
        opacity={0.4}
      />
      <path
        d="M215.6 295.9H24a23.94 23.94 0 01-24-24v-32a23.94 23.94 0 0124-24h191.5l-77.6-71.1a23.84 23.84 0 01-.7-34.5l21.9-21.9a24.08 24.08 0 0133.9-.1L344.9 239a24 24 0 010 34.1L193 423.7a24 24 0 01-33.9-.1l-21.9-21.9a24 24 0 01.8-34.7z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
