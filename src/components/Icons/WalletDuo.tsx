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
        d="M480 80v56.877c-9.445-5.498-20.283-8.877-32-8.877H48c-26.51 0-48-21.49-48-48s21.49-48 48-48h384c26.51 0 48 21.492 48 48z"
        opacity={0.4}
      />
      <path
        d="M448 128H48c-26.51 0-48-21.49-48-48v336c0 35.346 28.654 64 64 64h384c35.346 0 64-28.654 64-64V192c0-35.348-28.654-64-64-64zm-32 208c-17.674 0-32-14.328-32-32 0-17.674 14.326-32 32-32s32 14.326 32 32c0 17.672-14.326 32-32 32z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
