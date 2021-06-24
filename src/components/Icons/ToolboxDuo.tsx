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
        d="M384 320v48c0 8.875-7.125 16-16 16h-32c-8.875 0-16-7.125-16-16v-48H192v48c0 8.875-7.125 16-16 16h-32c-8.875 0-16-7.125-16-16v-48H0v128c0 17.625 14.375 32 32 32h448c17.625 0 32-14.375 32-32V320H384zM176 80h160v48h48V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v48h48V80z"
        opacity={0.4}
      />
      <path
        d="M512 205.25V320H384v-48c0-8.875-7.125-16-16-16h-32c-8.875 0-16 7.125-16 16v48H192v-48c0-8.875-7.125-16-16-16h-32c-8.875 0-16 7.125-16 16v48H0V205.25c0-8.5 3.375-16.625 9.375-22.625l45.25-45.25c6-6 14.125-9.375 22.625-9.375h357.5c8.5 0 16.625 3.375 22.625 9.375l45.25 45.25c6 6 9.375 14.125 9.375 22.625z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
