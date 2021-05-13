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
        d="M488.12 352H23.94A23.94 23.94 0 000 375.88V456a23.94 23.94 0 0023.88 24h464.18A23.94 23.94 0 00512 456.12V376a23.94 23.94 0 00-23.88-24zM464 432H48v-32h416zm24.12-240H23.94A23.94 23.94 0 000 215.88V296a23.94 23.94 0 0023.88 24h464.18A23.94 23.94 0 00512 296.12V216a23.94 23.94 0 00-23.88-24zM464 272H48v-32h416zm24.12-240H23.94A23.94 23.94 0 000 55.88V136a23.94 23.94 0 0023.88 24h464.18A23.94 23.94 0 00512 136.12V56a23.94 23.94 0 00-23.88-24zM464 112H48V80h416z"
        opacity={0.4}
      />
      <path
        d="M48 80v32h304V80zm112 160H48v32h112zM48 432h240v-32H48z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
