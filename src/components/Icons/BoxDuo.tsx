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
        d="M512 224v240a48 48 0 01-48 48H48a48 48 0 01-48-48V224z"
        opacity={0.4}
      />
      <path
        d="M53.1 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0H98.6a47.87 47.87 0 00-45.5 32.8zm456.4 151.8L458.9 32.8A47.87 47.87 0 00413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
